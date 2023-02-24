import Link from 'next/link'
import Image from 'next/image'
import { Oswald } from '@next/font/google'
import { getTagLink } from './get-tag-link'
import classes from '../../styles/post-item.module.scss'

const oswald = Oswald({
  weight: ['400'],
  subsets: ['latin'],
    display: 'optional',
    variable: '--oswald-font',
})

function PostItem(props) {

    const { post } = props

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    };

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', options)

    const imagePath = `/images/posts/${post.slug}/${post.image}`

    const linkPath = `/posts/${post.slug}`
    return (
        <li className={`post ${classes.post}`}>
            <Link href={linkPath}>
                <figure className={classes.image}>
                    <Image
                        src={imagePath}
                        alt={post.title}
                        width={300}
                        height={200}
                        className={classes.img}
                        />
                    <figcaption className={`${classes.content} ${oswald.variable}`}>
                        <h3>{post.title}</h3>
                        <time className={`time`}>{formattedDate}</time>
                        <p>{post.author}</p>
                        <p>{post.excerpt}</p>
                        <p>{post.tags.map(tag => getTagLink(tag)).reduce((prev, curr) => [prev, ', ', curr])}</p>
                    </figcaption>
                </figure>
            </Link>
        </li>
    );
}

export default PostItem