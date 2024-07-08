import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PostHeader from '../components/posts/post-detail/post-header'

describe('Post Header', () => {
	it('renders a header', () => {
		render(<PostHeader />)

		const header = screen.getByTestId('post-header')

		expect(header).toBeInTheDocument()
	})
})
