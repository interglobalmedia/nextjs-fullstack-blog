import PostsGrid from '../posts/posts-grid'
import classes from '../../styles/featured-posts.module.scss'

function FeaturedPosts(props) {
    return (
        <section className={classes.latest}>
            <h2>Featured Posts</h2>
            {/* separate component for list of posts here */}
            <PostsGrid posts={props.posts} />
        </section>
    )
}

export default FeaturedPosts