import { range } from '../shared/glyph-background'

/* Passed to <GlyphBackground generateContent={generateContactGlyph} />.
   About reuses the same component with its own default generator (wide
   Unicode range, single characters), Resume themes it around the command
   line — this one is themed for the Contact page: cryptographic/logic
   symbols as the bulk of the background, with real short encryption-related
   terms mixed in for texture, tying "reaching out" to "sending something
   secure" without being literal about it. */

const SYMBOLS = [
	// hex digits — the actual alphabet a hash or key is written in
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	// boolean/bitwise operators — the real building blocks of a cipher
	'⊕',
	'⊗',
	'⊙',
	'⊞',
	'⊟',
	'≡',
	'≢',
	'≠',
	'¬',
	'∧',
	'∨',
	// key/lock glyphs
	'⚿',
	'⚷',
	// proof/logic symbols, crypto proofs lean on these
	'∀',
	'∃',
	'∴',
	'∵',
	'⊢',
	'⊨',
	'∎',
	// misc crypto-adjacent punctuation
	'§',
	'¤',
	'‡',
	'†',
	'∞',
	'√',
	'Δ',
	'Σ',
	'Π',
]

const TERMS = [
	'AES',
	'RSA',
	'SHA256',
	'SHA1',
	'MD5',
	'HMAC',
	'PGP',
	'GPG',
	'TLS',
	'SSL',
	'DES',
	'3DES',
	'ECC',
	'ECDSA',
	'salt',
	'hash',
	'nonce',
	'IV',
	'PBKDF2',
	'bcrypt',
	'base64',
	'XOR',
	'cipher',
	'keygen',
	'encrypt',
	'decrypt',
	'checksum',
	'digest',
	'handshake',
]

// Roughly how many 75px grid cells a piece of term text needs, given the
// .command modifier's ~26px monospace font. Capped so a long term like
// "handshake" doesn't sprawl too far across the grid.
function computeSpan(text) {
	const approxPxWidth = text.length * 16 + 24
	return Math.min(4, Math.max(1, Math.ceil(approxPxWidth / 75)))
}

// ~18% of cells are short terms; the rest are single large symbols —
// same ratio as Resume, so the two pages read as siblings in density.
const TERM_PROBABILITY = 0.18

export function generateContactGlyph() {
	const isTerm = Math.random() < TERM_PROBABILITY

	if (isTerm) {
		const text = TERMS[range(0, TERMS.length - 1)]
		return { text, span: computeSpan(text) }
	}

	const text = SYMBOLS[range(0, SYMBOLS.length - 1)]
	return { text, span: 1 }
}
