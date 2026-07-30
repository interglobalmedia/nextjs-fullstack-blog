import Link from 'next/link'
// import classes from '../../styles/project-item.module.scss'

export const getProjectTagLink = (tag) => {
	return (
		<Link className={`project-tag`} href={`/projects/tag/${tag}`}>
			{tag}
		</Link>
	)
}
