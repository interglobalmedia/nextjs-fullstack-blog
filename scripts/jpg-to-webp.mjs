#!/usr/bin/env node
/**
 * Batch JPG → WebP converter for blog post images.
 *
 * Usage:
 *   node scripts/jpg-to-webp.mjs                              # all posts
 *   node scripts/jpg-to-webp.mjs public/images/blog/my-post/  # one post
 *
 * For each JPG found:
 *   1. Converts to WebP with cwebp (default quality)
 *   2. Deletes the original JPG
 *   3. Updates .jpg → .webp in the matching data/blog/<slug>.mdx
 *
 * Requires: cwebp in PATH  (`brew install webp`)
 * Safe to re-run: skips images that already have a .webp counterpart.
 */

import { readdirSync, readFileSync, writeFileSync, unlinkSync, statSync } from 'fs'
import { join, basename, dirname, extname } from 'path'
import { spawnSync } from 'child_process'
import { createInterface } from 'readline'

// ANSI helpers
const green  = (s) => `\x1b[32m${s}\x1b[0m`
const red    = (s) => `\x1b[31m${s}\x1b[0m`
const yellow = (s) => `\x1b[33m${s}\x1b[0m`
const dim    = (s) => `\x1b[2m${s}\x1b[0m`
const bold   = (s) => `\x1b[1m${s}\x1b[0m`
const cyan   = (s) => `\x1b[36m${s}\x1b[0m`

const IMAGES_ROOT = 'public/images/blog'
const MDX_ROOT    = 'data/blog'

// ── Helpers ──────────────────────────────────────────────────────────────────

function isJpg(name) {
    const ext = extname(name).toLowerCase()
    return ext === '.jpg' || ext === '.jpeg'
}

/**
 * Recursively collect all jpg/jpeg files under a directory.
 * Returns absolute-ish paths (relative to CWD).
 */
function collectJpgs(dir) {
    const results = []
    let entries
    try {
        entries = readdirSync(dir, { withFileTypes: true })
    } catch {
        return results
    }
    for (const entry of entries) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) {
            results.push(...collectJpgs(full))
        } else if (entry.isFile() && isJpg(entry.name)) {
            results.push(full)
        }
    }
    return results
}

/**
 * Given a JPG path like public/images/blog/my-post/img.jpg,
 * return the slug "my-post" (the immediate subdirectory under IMAGES_ROOT).
 */
function slugFromImagePath(imgPath) {
    // Normalize separators and split
    const parts = imgPath.replace(/\\/g, '/').split('/')
    // Find the index of the last segment of IMAGES_ROOT
    const rootParts = IMAGES_ROOT.replace(/\\/g, '/').split('/')
    const rootLast = rootParts[rootParts.length - 1]
    const idx = parts.indexOf(rootLast)
    if (idx === -1 || idx + 1 >= parts.length) return null
    return parts[idx + 1]
}

function mdxPathForSlug(slug) {
    return join(MDX_ROOT, `${slug}.mdx`)
}

function webpPathForJpg(jpgPath) {
    const dir  = dirname(jpgPath)
    const base = basename(jpgPath, extname(jpgPath))
    return join(dir, `${base}.webp`)
}

function webpAlreadyExists(jpgPath) {
    try {
        statSync(webpPathForJpg(jpgPath))
        return true
    } catch {
        return false
    }
}

function mdxExists(mdxPath) {
    try {
        statSync(mdxPath)
        return true
    } catch {
        return false
    }
}

// ── Core operations ───────────────────────────────────────────────────────────

function convertToWebp(jpgPath) {
    const outPath = webpPathForJpg(jpgPath)
    const result  = spawnSync('cwebp', [jpgPath, '-o', outPath], {
        encoding: 'utf8',
        stdio: 'pipe',
    })
    if (result.error) throw new Error(`cwebp not found: ${result.error.message}`)
    if (result.status !== 0) {
        const msg = (result.stderr || result.stdout || '').trim()
        throw new Error(`cwebp failed (exit ${result.status}): ${msg}`)
    }
    return outPath
}

function updateMdx(mdxPath, jpgBase, ext) {
    const src     = readFileSync(mdxPath, 'utf8')
    // Replace every occurrence of basename.jpg (or .jpeg) with basename.webp
    const pattern = new RegExp(jpgBase.replace('.', '\\.') + ext.replace('.', '\\.'), 'g')
    const updated = src.replace(pattern, `${jpgBase}.webp`)
    if (updated !== src) {
        writeFileSync(mdxPath, updated, 'utf8')
        return true
    }
    return false
}

// ── Interactive confirm ───────────────────────────────────────────────────────

async function confirm(question) {
    const rl = createInterface({ input: process.stdin, output: process.stdout })
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close()
            resolve(answer.trim().toLowerCase() === 'y')
        })
    })
}

// ── Main ──────────────────────────────────────────────────────────────────────

const targetDir = process.argv[2] || IMAGES_ROOT

console.log(bold(`\nScanning: ${targetDir}\n`))

const allJpgs = collectJpgs(targetDir)

if (allJpgs.length === 0) {
    console.log(dim('No JPG files found.'))
    process.exit(0)
}

// Separate into "to process" and "already done"
const toProcess = []
const alreadyDone = []

for (const jpgPath of allJpgs) {
    if (webpAlreadyExists(jpgPath)) {
        alreadyDone.push(jpgPath)
    } else {
        toProcess.push(jpgPath)
    }
}

if (alreadyDone.length > 0) {
    console.log(dim(`Skipping ${alreadyDone.length} already-converted file(s).\n`))
}

if (toProcess.length === 0) {
    console.log(green('All JPGs already have WebP counterparts. Nothing to do.'))
    process.exit(0)
}

// Preview table
console.log(bold(`Found ${toProcess.length} JPG(s) to convert:\n`))

const rows = toProcess.map((jpgPath) => {
    const slug    = slugFromImagePath(jpgPath)
    const mdxPath = slug ? mdxPathForSlug(slug) : null
    const mdxOk   = mdxPath && mdxExists(mdxPath)
    const mdxNote = mdxOk
        ? dim(mdxPath)
        : mdxPath
            ? yellow(`${mdxPath} (not found — will skip MDX update)`)
            : yellow('(no slug detected — will skip MDX update)')
    return { jpgPath, slug, mdxPath, mdxOk, mdxNote }
})

// Group by slug for readability
const bySlug = {}
for (const row of rows) {
    const key = row.slug || '(unknown)'
    if (!bySlug[key]) bySlug[key] = []
    bySlug[key].push(row)
}

for (const [slug, entries] of Object.entries(bySlug)) {
    console.log(cyan(`  ${slug}/`))
    for (const { jpgPath, mdxNote } of entries) {
        console.log(`    ${basename(jpgPath)}  →  ${basename(jpgPath, extname(jpgPath))}.webp`)
        console.log(`    MDX: ${mdxNote}`)
    }
    console.log()
}

const proceed = await confirm(bold('Convert all of the above? [y/N] '))

if (!proceed) {
    console.log(dim('\nAborted. No changes made.'))
    process.exit(0)
}

console.log()

// Process
const stats = { converted: 0, failed: 0, mdxUpdated: 0 }

for (const { jpgPath, mdxPath, mdxOk } of rows) {
    const name = basename(jpgPath)
    process.stdout.write(`  ${name} … `)

    // 1. Convert
    let webpPath
    try {
        webpPath = convertToWebp(jpgPath)
    } catch (err) {
        console.log(red(`FAILED — ${err.message}`))
        stats.failed++
        continue
    }

    // 2. Delete original
    try {
        unlinkSync(jpgPath)
    } catch (err) {
        console.log(yellow(`converted but could not delete original: ${err.message}`))
        stats.converted++
        // Still try to update MDX
    }

    // 3. Update MDX
    if (mdxOk) {
        const ext  = extname(jpgPath).toLowerCase()          // .jpg or .jpeg
        const base = basename(jpgPath, extname(jpgPath))     // filename without ext
        try {
            const changed = updateMdx(mdxPath, base, ext)
            if (changed) stats.mdxUpdated++
        } catch (err) {
            console.log(yellow(`converted but MDX update failed: ${err.message}`))
            stats.converted++
            continue
        }
    }

    console.log(green('✓'))
    stats.converted++
}

// Summary
console.log(`
${bold('Done.')}
  Converted:    ${green(String(stats.converted))}
  Failed:       ${stats.failed > 0 ? red(String(stats.failed)) : dim('0')}
  MDX updated:  ${green(String(stats.mdxUpdated))}

Run ${dim('git diff')} to review MDX changes before committing.
`)
