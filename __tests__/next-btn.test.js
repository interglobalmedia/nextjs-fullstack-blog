import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import NextBtn from '../components/buttons/next-btn'

describe('NextBtn', () => {
	it('renders a button with the text "Next"', () => {
		const { getByText } = render(<NextBtn />)
		expect(getByText('Next')).toBeTruthy()
	})
})
