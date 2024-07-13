import Head from 'next/head'
import { Fragment } from 'react'
import classes from '../styles/about.module.scss'

function AboutPage() {
	return (
		<Fragment>
			<Head>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<title>Maria D. Campbell's Next Blog Blog Page</title>
				<meta
					name="description"
					content="Welcome to my About page, which tells you a bit about this site. I blog about cybersecurity, fullstack development as well as
				macOS, Command Line, Linux, shell scripting, Windows, Git, and ethics
				in technology"
				/>
				<meta
					name="keywords"
					content="applescript, awk, chflags, schg, chmod, command line, command prompt, cryptography, css, cybersecurity, django 4, encryption, environment variables, file conversion, file permissions, git, git hooks, github, branch protection, grep, husky, jira, javascript, html, lint-staged, linux, kali linux, keyboard shortcuts, macos, mysql, next.js, node.js, npm, pipe, python, react, react portal, redirect operators, shell scripting, software updates, sql, ssh, stdin, stdout, stderr, unix, virtualbox, windows, windows 11, write protect files, zsh"
				/>
			</Head>
			<section className={`about-section ${classes['about-section']}`}>
				<h1>About this Site</h1>
				<article
					className={`about-article ${classes['about-article']}`}
				>
					<p className={classes.info}>
						If you would like to contact me, you can email me by
						clicking on the envelope in the site footer.
					</p>
					<p className={classes.info}>
						Looking forward to hearing from you!
					</p>
					<p className={classes.info}>
						Spam will be automatically blocked and deleted.
					</p>
					<p className={classes.info}>
						Available for new work opportunities. And be sure to
						check out my Skills page to learn more about what I have
						to offer.
					</p>
				</article>
			</section>
		</Fragment>
	)
}

export default AboutPage
