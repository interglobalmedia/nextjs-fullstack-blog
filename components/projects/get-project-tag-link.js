import Link from 'next/link'
import classes from '../../styles/post-item.module.scss'

export const getProjectTagLink = (tag) => {
	return (
		<Link className={`${classes.tag} tag`} href={`/projects/tag/${tag}`}>
			#{tag}
		</Link>
	)
}
