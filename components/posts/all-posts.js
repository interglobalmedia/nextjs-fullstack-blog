import dynamic from 'next/dynamic'
import classes from '../../styles/all-posts.module.scss'

const DynamicPostsGrid = dynamic(() => import('./posts-grid'))

function AllPosts(props) {
    const { posts } = props
    
    return (
        <section className={`${classes.posts}`}>
            <h1>All Posts</h1>
            <DynamicPostsGrid posts={posts} />
        </section>
    )
}

export default AllPosts