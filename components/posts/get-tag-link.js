import Link from 'next/link'
import classes from '../../styles/post-item.module.scss'

export const getTagLink = (tag) => {
    return (
        <Link className={`${classes.tag} tag`} href={`/blog/tag/${tag}`}>#{tag}</Link>
    )
}