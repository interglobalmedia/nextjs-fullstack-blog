import dynamic from 'next/dynamic'
import classes from '../../styles/featured-posts.module.scss'

const DynamicPostsGrid = dynamic(() => import('../posts/posts-grid'))

function FeaturedPosts(props) {
    return (
        <section className={`${classes.latest}`}>
            <h2>Featured Posts</h2>
            {/* separate component for list of posts here */}
            <DynamicPostsGrid posts={props.posts} />
        </section>
    )
}

export default FeaturedPosts