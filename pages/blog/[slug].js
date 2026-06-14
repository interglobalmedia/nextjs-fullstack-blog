import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { getPostData, getAllPosts } from '../../lib/posts-util.js'
import siteMetadata from '../../data/siteMetadata.js'
import Head from '../../components/seo/head.js'

const DynamicPostContent = dynamic(
	() => import('../../components/posts/post-detail/post-content.js'),
)
const DynamicScrollTop = dynamic(
	() => import('../../components/buttons/scroll-top.js'),
)
const DynamicScrollStep = dynamic(
	() => import('../../components/buttons/scroll-step.js'),
)

function PostDetailPage(props) {
	const { post } = props
	const url = `${siteMetadata.siteUrl}/blog/${post.slug}`
	const image = `${siteMetadata.siteUrl}/images/blog/${post.slug}/${post.image}`

	return (
		<Fragment>
			<Head
				title={post.title}
				excerpt={post.excerpt}
				url={url}
				author={post.author}
				image={image}
				imageAlt={post.title}
				date={post.date}
				lastModified={post.lastModified}
				type="article"
			/>
			<DynamicPostContent post={post} />
			<div className={`buttons-container`}>
				<DynamicScrollStep />
				<DynamicScrollTop />
			</div>
		</Fragment>
	)
}

export async function getStaticProps(context) {
	const { params } = context
	const { slug } = params

	const post = getPostData(slug)

	// Guard: if the post exists but has been unpublished, treat as 404.
	// This handles the edge case where a cached or externally linked URL
	// is accessed after a post has been unpublished.
	if (!post || !post.isPublished) {
		return { notFound: true }
	}

	return {
		props: {
			post,
		},
		revalidate: 10,
	}
}

export function getStaticPaths() {
	const publishedPosts = getAllPosts()

	return {
		paths: publishedPosts.map((post) => ({
			params: { slug: post.slug },
		})),
		fallback: 'blocking',
	}
}

export default PostDetailPage
