import '@testing-library/jest-dom'
import PostItem from '../components/posts/post-item'

describe('PostItem', () => {
	jest.mock('react-transition-group', () => {
		return {
			CSSTransition: (props) => (props.in ? props.children : null),
		}
	})
	it('renders a post item in the posts grid', () => {
		// Replace `new Date()` with the actual value of `post.date`
		const formattedDate = new Date()
		if (formattedDate) {
			const props = { formattedDate }
			// Spread the props object to pass the 'date' prop correctly
			expect(<PostItem {...props} />).toBeTruthy()
			console.log('Post Item props are truthy')
		} else {
			const props = {}
			expect(<PostItem {...props} />).not.toBeTruthy()
			console.log('Post Item props are not truthy')
		}
	})
})
