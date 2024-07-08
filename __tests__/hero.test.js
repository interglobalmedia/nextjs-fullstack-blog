import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Hero from '../components/home-page/hero.js'

describe('Home Hero Image', () => {
	it('renders a hero image at the top of the page', () => {
		render(<Hero />)
	})
	const { container } = render(<Hero />)
	container.querySelector('.hero')
	expect(container.querySelector('.hero')).toBeInTheDocument()
})
