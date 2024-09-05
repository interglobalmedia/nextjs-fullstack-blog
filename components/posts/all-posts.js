import dynamic from 'next/dynamic'
import classes from '../../styles/all-posts.module.scss'

const DynamicPostsGrid = dynamic(() => import('./posts-grid'))

function AllPosts(props) {
	const { posts, initialDisplayPosts, pagination } = props

	return (
		<>
			<section className={`${classes.posts}`}>
				<h1>All Posts</h1>
				<DynamicPostsGrid
					posts={posts}
					pagination={pagination}
					initialDisplayPosts={initialDisplayPosts}
				/>
			</section>
		</>
	)
}

export default AllPosts
