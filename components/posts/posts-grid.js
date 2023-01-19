import PostItem from './post-item'
import classes from './posts-grid.module.scss'

function PostsGrid(props) {
    const { posts } = props;

    console.log(posts)
    return (
        <ul className={classes.grid}>
            {posts.map(post => (
                <PostItem key={post.slug} post={post} />
            ))}
        </ul>
    )
}

export default PostsGrid