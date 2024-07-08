import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import Link from 'next/link'
import { getTagLink } from '../components/posts/get-tag-link'

describe('getTagLink', () => {
	it('renders a tag link', () => {
		const tagMacOS = getTagLink(`macOS`)
		const tagLink = <Link href={tagMacOS}>#{tagMacOS}</Link>
		const tree = renderer.create(tagLink).toJSON()

		expect(tree).toMatchSnapshot()
	})
})
