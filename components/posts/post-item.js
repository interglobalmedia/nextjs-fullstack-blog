import Link from 'next/link'
import Image from "next/legacy/image";
import { getTagLink } from './get-tag-link'
import classes from '../../styles/post-item.module.scss'

function PostItem(props) {

    const { post } = props

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    };

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', options)

    console.log(formattedDate)

    const imagePath = `/images/posts/${post.slug}/${post.image}`

    const linkPath = `/posts/${post.slug}`
    return (
        <li className={classes.post}>
            <Link href={linkPath}>
                <figure className={classes.image}>
                    <Image src={imagePath} alt={post.title} width={300} height={200} layout="responsive"
                    className={classes.img} legacybehavior="true" />
                    <figcaption className={classes.content}>
                        <h3>{post.title}</h3>
                        <time className={`time`}>{formattedDate}</time>
                        <p>{post.author}</p>
                        <p>{post.excerpt}</p>
                        <p>{post.tags.map(tag => getTagLink(tag)).reduce((prev, curr) => [prev, ', ', curr])}</p>
                    </figcaption>
                </figure>
            </Link>
        </li>
    )
}

export default PostItem