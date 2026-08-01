import Link from 'next/link'

export const getTagLink = (tag) => {
	return (
		<Link className={`post-tag`} href={`/blog/tag/${tag}`}>
			#{tag}
		</Link>
	)
}
