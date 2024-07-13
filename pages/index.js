import { Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Hero from '../components/home-page/hero'
import { getFeaturedPosts } from '../lib/posts-util'

const DynamicFeaturedPosts = dynamic(() =>
	import('../components/home-page/featured-posts'),
)

function HomePage(props) {
	return (
		<Fragment>
			<Head>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<title>Maria D. Campbell's Next Blog</title>
				<meta
					name="description"
					content="I blog about cybersecurity, fullstack development as well as macOS, Command Line, Git, and ethics in technology."
				/>
				<meta
					name="keywords"
					content="applescript, awk, chflags, schg, chmod, command line, command prompt, cryptography, css, cybersecurity, django 4, encryption, environment variables, file conversion, file permissions, git, git hooks, github, branch protection, grep, husky, jira, javascript, html, lint-staged, linux, kali linux, keyboard shortcuts, macos, mysql, nextjs, nodejs, npm, pipe, python, react, react portal, redirect operators, shell scripting, software updates, sql, ssh, stdin, stdout, stderr, unix, virtualbox, windows, windows 11, write protect files, zsh"
				/>
			</Head>
			<Hero />
			<DynamicFeaturedPosts posts={props.posts} />
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
