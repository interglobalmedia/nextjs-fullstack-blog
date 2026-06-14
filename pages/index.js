import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import Hero from '../components/home-page/hero'
import { getFeaturedPosts } from '../lib/posts-util'
import ScrollStep from '../components/buttons/scroll-step'
import ScrollTop from '../components/buttons/scroll-top'
import Head from '../components/seo/head'
import siteMetadata from '../data/siteMetadata'

const DynamicFeaturedPosts = dynamic(
	() => import('../components/home-page/featured-posts'),
)

const DEFAULT_IMAGE = `${siteMetadata.siteUrl}${siteMetadata.defaultImage}`

function HomePage(props) {
	const url = siteMetadata.siteUrl

	return (
		<Fragment>
			<Head
				title="Home"
				excerpt="Security, fullstack development, macOS, command line, Linux, shell scripting, Windows, Git, and ethics in technology."
				url={url}
				author={siteMetadata.author}
				image={DEFAULT_IMAGE}
				imageAlt="Maria D. Campbell — Security, Fullstack Development, macOS, Linux"
				type="website"
			/>
			<Hero />
			<DynamicFeaturedPosts posts={props.posts} />
			<ScrollStep />
			<ScrollTop />
		</Fragment>
	)
}

export async function getStaticProps() {
	const featuredPosts = getFeaturedPosts()
	return {
		props: {
			posts: featuredPosts,
		},
		revalidate: 60,
	}
}

export default HomePage
