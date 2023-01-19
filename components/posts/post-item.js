import Link from 'next/link'
import Image from 'next/image'
import classes from './post-item.module.scss'

function PostItem(props) {

    const { post } = props

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', options)

    console.log(formattedDate)

    const imagePath = `/images/posts/${post.slug}/${post.image}`

    const linkPath = `/posts/${post.slug}`
    return (
        <li className={classes.post}>
            <Link href={linkPath}>
                <figure className={classes.image}>
                    <Image src={imagePath} alt={post.title} width={300} height={200} layout="responsive" legacyBehavior />
                    <figcaption className={classes.content}>
                        <h3>{post.title}</h3>
                        <time>{formattedDate}</time>
                        <p>{post.excerpt}</p>
                    </figcaption>
                </figure>
            </Link>
        </li>
    )
}

export default PostItem