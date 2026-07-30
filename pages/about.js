import { Fragment } from 'react'
import Head from '../components/seo/head'
import siteMetadata from '../data/siteMetadata'
import classes from '../styles/about.module.scss'
import bgClasses from '../styles/glyph-background.module.scss'
import GlyphBackground from '../components/about/glyph-background'

const DEFAULT_IMAGE = `${siteMetadata.siteUrl}${siteMetadata.defaultImage}`

function AboutPage() {
	const url = `${siteMetadata.siteUrl}/about`

	return (
		<Fragment>
			<Head
				title="About"
				excerpt="Learn about Maria D. Campbell's site — covering security, fullstack development, macOS, command line, Linux, shell scripting, Windows, Git, and ethics in technology."
				url={url}
				author={siteMetadata.author}
				image={DEFAULT_IMAGE}
				imageAlt="Maria D. Campbell — Security, Fullstack Development, macOS, Linux"
				keywords="ai, applescript, awk, chflags, schg, chmod, command line, command prompt, cryptography, css, cybersecurity, django 4, encryption, environment variables, file conversion, file permissions, git, git hooks, github, branch protection, grep, husky, jira, javascript, html, lint-staged, linux, kali linux, keyboard shortcuts, macos, mysql, next.js, node.js, npm, pipe, python, react, react portal, redirect operators, shell scripting, software updates, sql, ssh, stdin, stdout, stderr, unix, virtualbox, windows, windows 11, write protect files, zsh"
				type="website"
			/>
			<div className={bgClasses['page-wrapper']}>
				<GlyphBackground />
				<section
					className={`about-section ${classes['about-section']}`}
				>
					<h1>About</h1>
					<article
						className={`about-article ${classes['about-article']}`}
					>
						<p className={classes.info}>
							I&apos;m a developer with a focus on Linux/Unix
							systems and Python/Django, and a writer who
							documents what I build along the way.
						</p>
						<p className={classes.info}>
							The interest goes back further than my resume does.
							Years ago, working as a creative director at a small
							cosmetics company, I used to watch the guys who
							serviced my Mac navigate it entirely from the
							command line. I got curious. The minute I started
							learning it myself, I knew the hunch was right.
						</p>
						<p className={classes.info}>
							That curiosity became a practice. In 2007, unable to
							find anyone who could build a website the way I
							wanted it, I taught myself WordPress and built it
							myself. That same drive carried me through a decade
							of freelance and consulting work, then into teaching
							web development at the college level, and then,
							after stepping away from teaching in 2022, into
							going all in on the technical side. Since then
							I&apos;ve earned a Google Cybersecurity certificate,
							worked through Linux Foundation coursework, and kept
							building and writing, one post and project at a
							time.
						</p>
						<p className={classes.info}>
							My writing works the same way my problem-solving
							does. I dig into why one approach beats another, not
							just how either one works: Wireshark versus tcpdump,
							Python versus the command line, one encryption
							method against the next. That comparison instinct
							comes from the same detective streak that shows up
							in everything I build. The audience may shift, but
							the instinct to investigate doesn&apos;t.
						</p>
						<p className={classes.info}>
							Here&apos;s where I am now... focused on Linux/Unix
							systems and Python/Django, still writing, still
							weighing one approach against another. I&apos;m
							available for remote-first work and open to speaking
							and presenting opportunities, and the proof is on
							the Projects page, project by project, post by post.
						</p>
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
					</article>
				</section>
			</div>
		</Fragment>
	)
}

export default AboutPage
