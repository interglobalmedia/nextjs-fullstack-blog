import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import PrevBtn from '../components/buttons/prev-btn'

describe('PrevBtn', () => {
	it('renders a button with the text "Prev"', () => {
		const { getByText } = render(<PrevBtn />)
		expect(getByText('Prev')).toBeTruthy()
	})
})
