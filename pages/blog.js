import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { getAllPosts } from '../lib/posts-util'
import ScrollStep from '../components/buttons/scroll-step'
import ScrollTop from '../components/buttons/scroll-top'

const DynamicAllPosts = dynamic(() => import('../components/posts/all-posts'))

export const POSTS_PER_PAGE = 10

export async function getStaticProps() {
	const posts = getAllPosts()
	const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
	}

	return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
	return (
		<Fragment>
			<Head>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<title>Maria D. Campbell's Next Blog Blog Page</title>
				<meta
					name="description"
					content="Welcome to my Blog page, which contains which contains all my blog posts. I blog about cybersecurity, fullstack development as well as
				macOS, Command Line, Linux, shell scripting, Windows, Git, and ethics
				in technology"
				/>
				<meta
					name="keywords"
					content="applescript, awk, chflags, schg, chmod, command line, command prompt, cryptography, css, cybersecurity, django 4, encryption, environment variables, file conversion, file permissions, git, git hooks, github, branch protection, grep, husky, jira, javascript, html, lint-staged, linux, kali linux, keyboard shortcuts, macos, mysql, next.js, node.js, npm, pipe, python, react, react portal, redirect operators, shell scripting, software updates, sql, ssh, stdin, stdout, stderr, unix, virtualbox, windows, windows 11, write protect files, zsh"
				/>
			</Head>
			<DynamicAllPosts
				posts={posts}
				initialDisplayPosts={initialDisplayPosts}
				pagination={pagination}
			/>
			<ScrollStep />
			<ScrollTop />
		</Fragment>
	)
}
