import { range } from '../shared/glyph-background'

/* Passed to <GlyphBackground generateContent={generateResumeGlyph} />.
   About-page reuses the same component with its own default generator
   (wide Unicode range, single characters) — this one is themed for the
   Resume page: command-line punctuation/arrows/keys as the bulk of the
   background, with real short shell commands mixed in for texture. */

const SYMBOLS = [
	'$',
	'>',
	'~',
	'|',
	'&',
	'#',
	'*',
	'/',
	'\\',
	'%',
	'!',
	'?',
	':',
	';',
	'`',
	'^',
	'+',
	'=',
	'<',
	'[',
	']',
	'{',
	'}',
	'(',
	')',
	'_',
	'-',
	'.',
	'→',
	'←',
	'↑',
	'↓',
	'⇒',
	'⇐',
	'⌘',
	'⌥',
	'⇧',
	'⌃',
	'⏎',
	'⌫',
	'⎋',
	'⇥',
	'─',
	'│',
	'┌',
	'┐',
	'└',
	'┘',
	'├',
	'┤',
	'┬',
	'┴',
	'┼',
	'═',
	'║',
	'╔',
	'╗',
	'╚',
	'╝',
]

const COMMANDS = [
	'ls',
	'cd',
	'pwd',
	'rm',
	'mv',
	'cp',
	'cat',
	'top',
	'ps',
	'man',
	'who',
	'du',
	'df',
	'awk',
	'sed',
	'vim',
	'tar',
	'head',
	'tail',
	'find',
	'echo',
	'exit',
	'jobs',
	'bg',
	'fg',
	'grep',
	'sudo',
	'chmod',
	'ssh',
	'curl',
	'chown',
	'nohup',
	'alias',
	'export',
	'source',
	'history',
	'xargs',
	'wget',
	'diff',
	'sort',
	'uniq',
	'git push',
	'git pull',
	'npm install',
	'pip install',
]

// Roughly how many 75px grid cells a piece of command text needs, given
// the .command modifier's ~26px monospace font. Capped so a long command
// like "npm install" doesn't sprawl too far across the grid.
function computeSpan(text) {
	const approxPxWidth = text.length * 16 + 24
	return Math.min(4, Math.max(1, Math.ceil(approxPxWidth / 75)))
}

// ~18% of cells are short commands; the rest are single large symbols.
const COMMAND_PROBABILITY = 0.18

export function generateResumeGlyph() {
	const isCommand = Math.random() < COMMAND_PROBABILITY

	if (isCommand) {
		const text = COMMANDS[range(0, COMMANDS.length - 1)]
		return { text, span: computeSpan(text) }
	}

	const text = SYMBOLS[range(0, SYMBOLS.length - 1)]
	return { text, span: 1 }
}
