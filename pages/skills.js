import { Fragment } from 'react'
import Head from '../components/seo/head'
import siteMetadata from '../data/siteMetadata'
import classes from '../styles/skills.module.scss'
import Skills from '../components/skills/skills'

const DEFAULT_IMAGE = `${siteMetadata.siteUrl}${siteMetadata.defaultImage}`

function SkillsPage() {
	const url = `${siteMetadata.siteUrl}/skills`

	return (
		<Fragment>
			<Head
				title="Skills"
				excerpt="A overview of Maria D. Campbell's technical skills including CLI, CSS3, JavaScript, Next.js, Node.js, Python, React, and more."
				url={url}
				author={siteMetadata.author}
				image={DEFAULT_IMAGE}
				imageAlt="Maria D. Campbell — Security, Fullstack Development, macOS, Linux"
				keywords="cli, css3, ejs, express, git, html5, jira, javascript, linux, macos, markdown, mongodb, next.js, node.js, npm, python, react, sass, sql, vscode, windows"
				type="website"
			/>
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
