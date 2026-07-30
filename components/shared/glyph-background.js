import { useEffect, useRef, useState } from 'react'
import classes from '../../styles/glyph-background.module.scss'

/* Ported from guess-the-keys: modules/range.mjs, modules/getChar.mjs,
   modules/getRandomColor.mjs, modules/Div.mjs, modules/createCharDivs.mjs.

   modules/pickColor.mjs is intentionally NOT ported — in the original it's
   built to pick randomly among several colors passed as arguments, but it
   was only ever called with a single argument (pickColor(getRandomColor())),
   so it always just returned that one color back. Functionally a no-op as
   used, so this version calls getRandomColor() directly instead.

   Generalized to accept a generateContent prop, so the same component backs
   both the About page (wide Unicode range, default behavior below) and the
   Resume page (command-line symbols + short commands, passed in by the
   caller) — one component, two very different looks. */

const CELL_SIZE = 75 // px, matches the grid cell size in the original

export function range(from, to) {
	return ~~(Math.random() * (to - from + 1) + from)
}

function defaultGetChar() {
	return String.fromCharCode(range(2300, 23))
}

// Default content generator: reproduces the original About-page behavior
// exactly (one random wide-range Unicode character, no column spanning).
function defaultGenerateContent() {
	return { text: defaultGetChar(), span: 1 }
}

function getRandomColor() {
	const chars = '0123456789ABCDEF'.split('')
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += chars[Math.round(Math.random() * 15)]
	}
	return color
}

function generateGlyphs(count, generateContent) {
	const glyphs = []
	for (let i = 0; i < count; i++) {
		const color = getRandomColor()
		const { text, span } = generateContent()
		glyphs.push({
			text,
			span,
			deg: `${range(75, 230)}deg`,
			color,
		})
	}
	return glyphs
}

const GlyphBackground = ({ generateContent = defaultGenerateContent }) => {
	const containerRef = useRef(null)
	const [glyphs, setGlyphs] = useState([])

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		let resizeTimeout

		const fillContainer = () => {
			const { offsetWidth, offsetHeight } = container
			const columns = Math.ceil(offsetWidth / CELL_SIZE) || 1
			const rows = Math.ceil(offsetHeight / CELL_SIZE) || 1
			// small buffer so partial cells at the edges still get filled,
			// and so column-spanning items (which use up more than one
			// cell each) still leave enough items to fill out each row
			const count = columns * rows + columns * 2
			setGlyphs(generateGlyphs(count, generateContent))
		}

		fillContainer()

		const handleResize = () => {
			clearTimeout(resizeTimeout)
			resizeTimeout = setTimeout(fillContainer, 200)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			clearTimeout(resizeTimeout)
			window.removeEventListener('resize', handleResize)
		}
	}, [generateContent])

	return (
		<div
			ref={containerRef}
			className={classes['glyph-background']}
			aria-hidden="true"
		>
			{glyphs.map((glyph, index) => (
				<div
					key={index}
					className={
						glyph.span > 1
							? `${classes['char-div']} ${classes.command}`
							: classes['char-div']
					}
					style={{
						'--deg': glyph.deg,
						'--colorbg': glyph.color,
						'--colortx': glyph.color,
						gridColumn: `span ${glyph.span}`,
					}}
				>
					{glyph.text}
				</div>
			))}
		</div>
	)
}

export default GlyphBackground
