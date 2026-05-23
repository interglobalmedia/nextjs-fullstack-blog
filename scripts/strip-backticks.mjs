#!/usr/bin/env node
/**
 * Interactive inline-backtick stripper for MDX files.
 *
 * Usage:
 *   node scripts/strip-backticks.mjs <path-to-file.mdx>
 *
 * For each inline code span found in prose (skipping frontmatter and fenced
 * code blocks), it shows the span in context and asks whether to remove the
 * backticks. Default answer is N (keep), so pressing Enter skips it.
 *
 * Changes are written back to the same file. Use `git diff` to review.
 */

import { createInterface } from 'readline'
import { readFileSync, writeFileSync } from 'fs'

// ANSI helpers
const yellow = (s) => `\x1b[33m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`
const bold = (s) => `\x1b[1m${s}\x1b[0m`
const green = (s) => `\x1b[32m${s}\x1b[0m`
const cyan = (s) => `\x1b[36m${s}\x1b[0m`

const filePath = process.argv[2]
if (!filePath) {
    console.error('Usage: node scripts/strip-backticks.mjs <file.mdx>')
    process.exit(1)
}

const source = readFileSync(filePath, 'utf8')

// ── Step 1: Identify prose regions (skip frontmatter + fenced code blocks) ──

/**
 * Returns an array of [start, end) character offsets that are "prose" —
 * i.e. not inside frontmatter or fenced code blocks.
 */
function proseRegions(text) {
    const regions = []
    const lines = text.split('\n')
    let offset = 0
    let inFrontmatter = false
    let frontmatterDone = false
    let inFenced = false
    let proseStart = null

    const pushProse = (end) => {
        if (proseStart !== null && end > proseStart) {
            regions.push([proseStart, end])
        }
        proseStart = null
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const lineEnd = offset + line.length + 1 // +1 for \n

        // Frontmatter: only the very first --- block
        if (i === 0 && line === '---') {
            inFrontmatter = true
            offset = lineEnd
            continue
        }
        if (inFrontmatter) {
            if (line === '---') {
                inFrontmatter = false
                frontmatterDone = true
            }
            offset = lineEnd
            continue
        }

        // Fenced code blocks: lines starting with ``` or ~~~
        if (!inFenced && (line.startsWith('```') || line.startsWith('~~~'))) {
            pushProse(offset)
            inFenced = true
            offset = lineEnd
            continue
        }
        if (inFenced && (line.startsWith('```') || line.startsWith('~~~'))) {
            inFenced = false
            offset = lineEnd
            proseStart = offset // prose resumes after closing fence
            continue
        }
        if (inFenced) {
            offset = lineEnd
            continue
        }

        // Prose line
        if (proseStart === null) proseStart = offset
        offset = lineEnd
    }

    // Flush any trailing prose
    pushProse(offset)
    return regions
}

// ── Step 2: Find all inline code spans within prose regions ──

/**
 * Each span: { start, end, inner }
 * start/end are absolute offsets into source (including the backticks).
 * inner is the text between the backticks.
 */
function findInlineSpans(text, regions) {
    const spans = []
    const re = /`([^`\n]+)`/g

    for (const [regionStart, regionEnd] of regions) {
        const slice = text.slice(regionStart, regionEnd)
        re.lastIndex = 0
        let m
        while ((m = re.exec(slice)) !== null) {
            spans.push({
                start: regionStart + m.index,
                end: regionStart + m.index + m[0].length,
                inner: m[1],
            })
        }
    }

    // Sort by position so we present them in order
    spans.sort((a, b) => a.start - b.start)
    return spans
}

// ── Step 3: Interactive prompts ──

function showContext(text, span, contextRadius = 70) {
    const ctxStart = Math.max(0, span.start - contextRadius)
    const ctxEnd = Math.min(text.length, span.end + contextRadius)

    const before = text.slice(ctxStart, span.start).replace(/\n/g, ' ')
    const match = text.slice(span.start, span.end)
    const after = text.slice(span.end, ctxEnd).replace(/\n/g, ' ')

    const ellL = ctxStart > 0 ? '…' : ''
    const ellR = ctxEnd < text.length ? '…' : ''

    console.log(dim(ellL + before) + yellow(match) + dim(after + ellR))
}

async function promptAll(text, spans) {
    if (spans.length === 0) {
        console.log(green('No inline code spans found in prose sections.'))
        return []
    }

    const rl = createInterface({ input: process.stdin, output: process.stdout })
    const ask = (q) => new Promise((res) => rl.question(q, res))

    console.log(
        bold(`\nFound ${spans.length} inline code span(s) in prose.\n`) +
        dim('For each one: press ') + bold('y') + dim(' to remove backticks, or ') +
        bold('Enter') + dim(' to keep.\n')
    )

    const toRemove = []
    let skipped = 0

    for (let i = 0; i < spans.length; i++) {
        const span = spans[i]
        const counter = cyan(`[${i + 1}/${spans.length}]`)
        console.log(`\n${counter} ${dim('Inner:')} ${yellow('`' + span.inner + '`')}`)
        showContext(text, span)

        const answer = await ask(bold('Remove backticks? [y/N] '))
        if (answer.trim().toLowerCase() === 'y') {
            toRemove.push(span)
        } else {
            skipped++
        }
    }

    rl.close()
    console.log(
        `\n${green('Done.')} Removing ${bold(String(toRemove.length))} span(s), ` +
        `keeping ${bold(String(skipped))}.\n`
    )
    return toRemove
}

// ── Step 4: Apply removals ──

function applyRemovals(text, toRemove) {
    // Work highest-offset first so earlier positions stay valid
    const sorted = [...toRemove].sort((a, b) => b.start - a.start)
    let result = text
    for (const span of sorted) {
        result = result.slice(0, span.start) + span.inner + result.slice(span.end)
    }
    return result
}

// ── Main ──

const regions = proseRegions(source)
const spans = findInlineSpans(source, regions)

console.log(bold(`\nFile: ${filePath}`))
console.log(dim(`Prose regions found: ${regions.length} | Inline spans: ${spans.length}`))

const toRemove = await promptAll(source, spans)

if (toRemove.length > 0) {
    const result = applyRemovals(source, toRemove)
    writeFileSync(filePath, result, 'utf8')
    console.log(green(`Saved. Run \`git diff ${filePath}\` to review changes.`))
} else {
    console.log(dim('No changes written.'))
}
