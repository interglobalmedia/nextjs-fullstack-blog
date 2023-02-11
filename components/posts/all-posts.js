import PostsGrid from './posts-grid'
import classes from '../../styles/all-posts.module.scss'

function AllPosts(props) {
    const { posts } = props

    return (
        <section className={classes.posts}>
            <h1>All Posts</h1>
            <PostsGrid posts={posts} />
        </section>
    )
}

export default AllPosts