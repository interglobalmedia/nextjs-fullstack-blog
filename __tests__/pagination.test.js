import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '../components/pagination/pagination'

describe('PostContent', () => {
	it("it renders the blog page's pagination", () => {
		render(<Pagination />)
		const { container } = render(<Pagination />)
		container.querySelector('.pagination')
		expect(container.querySelector('.pagination')).toBeInTheDocument()
	})
})
