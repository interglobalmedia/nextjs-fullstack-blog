import { useEffect, useRef, useState } from 'react'
import classes from '../../styles/glyph-background.module.scss'

/* Ported from guess-the-keys: modules/range.mjs, modules/getChar.mjs,
   modules/getRandomColor.mjs, modules/Div.mjs, modules/createCharDivs.mjs.

   modules/pickColor.mjs is intentionally NOT ported — in the original it's
   built to pick randomly among several colors passed as arguments, but it
   was only ever called with a single argument (pickColor(getRandomColor())),
   so it always just returned that one color back. Functionally a no-op as
   used, so this version calls getRandomColor() directly instead. */

const CELL_SIZE = 75 // px, matches .char-div font-size / grid cell in the original

function range(from, to) {
	return ~~(Math.random() * (to - from + 1) + from)
}

function getChar() {
	return String.fromCharCode(range(2300, 23))
}

function getRandomColor() {
	const chars = '0123456789ABCDEF'.split('')
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += chars[Math.round(Math.random() * 15)]
	}
	return color
}

function generateGlyphs(count) {
	const glyphs = []
	for (let i = 0; i < count; i++) {
		const color = getRandomColor()
		glyphs.push({
			char: getChar(),
			deg: `${range(75, 230)}deg`,
			color,
		})
	}
	return glyphs
}

const GlyphBackground = () => {
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
			// small buffer so partial cells at the edges still get filled
			const count = columns * rows + columns
			setGlyphs(generateGlyphs(count))
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
	}, [])

	return (
		<div
			ref={containerRef}
			className={classes['glyph-background']}
			aria-hidden="true"
		>
			{glyphs.map((glyph, index) => (
				<div
					key={index}
					className={classes['char-div']}
					style={{
						'--deg': glyph.deg,
						'--colorbg': glyph.color,
						'--colortx': glyph.color,
					}}
				>
					{glyph.char}
				</div>
			))}
		</div>
	)
}

export default GlyphBackground
