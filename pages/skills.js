import Head from 'next/head'
import { Fragment } from 'react'
import classes from '../styles/skills.module.scss'
import Skills from '../components/skills/skills'

function SkillsPage() {
	return (
		<Fragment>
			<Head>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<title>Maria D. Campbell's Next Blog Blog Page</title>
				<meta
					name="description"
					content="Welcome to my Skills page, which contains a list of some of my skills."
				/>
				<meta
					name="keywords"
					content="cli, css3, ejs, express, git, html5, jira, javascript, linux, macos, markdown, mongodb, next.js, node.js, npm, react, sass, sql, vscode, windows"
				/>
			</Head>
			<section className={`skills-section ${classes['skills-section']}`}>
				<h1 className={classes['heading-one']}>Skills</h1>
				<article
					className={`skills-article ${classes['skills-article']}`}
				>
					<Skills />
				</article>
			</section>
		</Fragment>
	)
}

export default SkillsPage
