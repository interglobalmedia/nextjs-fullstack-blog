import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { getTagLink } from '../components/posts/get-tag-link'

describe('getTagLink', () => {
	it('renders a tag link', () => {
		const { container } = render(getTagLink('macOS'))

		const link = container.querySelector('a')
		expect(link).toBeInTheDocument()
		expect(link).toHaveAttribute('href', '/blog/tag/macOS')
		expect(link).toHaveTextContent('#macOS')
		expect(link).toHaveClass('tag')
	})
})
