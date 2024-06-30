import dynamic from 'next/dynamic'
import { getAllPosts } from '../lib/posts-util'
import ScrollStep from '../components/buttons/scroll-step'
import ScrollTop from '../components/buttons/scroll-top'

const DynamicAllPosts = dynamic(() => import('../components/posts/all-posts'))

export const POSTS_PER_PAGE = 10

export async function getStaticProps() {
	const posts = getAllPosts()
	const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
	}

	return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
	return (
		<>
			<DynamicAllPosts posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination}
			/>
			<ScrollStep />
			<ScrollTop />
		</>
	)
}