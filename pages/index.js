import { Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Hero from '../components/home-page/hero'
import { getFeaturedPosts } from '../lib/posts-util'
import ScrollStep from '../components/buttons/scroll-step'
import ScrollTop from '../components/buttons/scroll-top'

const DynamicFeaturedPosts = dynamic(() =>
	import('../components/home-page/featured-posts'),
)

function HomePage(props) {
	return (
		<Fragment>
			<Head>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<title>Maria D. Campbell's Next Blog Home Page</title>
				<meta
					name="description"
					content="Welcome to my Home page, which contains featured blog posts. I blog about cybersecurity, fullstack development as well as macOS, Command Line, Linux, shell scripting, Windows, Git, and ethics
				in technology"
				/>
			</Head>
			<Hero />
			<DynamicFeaturedPosts posts={props.posts} />
			<ScrollStep />
			<ScrollTop />
		</Fragment>
	)
}

export function getStaticProps() {
	const featuredPosts = getFeaturedPosts()

	return {
		props: {
			posts: featuredPosts,
		},
	}
}

export default HomePage
