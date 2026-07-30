import { Fragment } from 'react'
import Link from 'next/link'
import Head from '../components/seo/head'
import siteMetadata from '../data/siteMetadata'
import classes from '../styles/resume.module.scss'
import bgClasses from '../styles/glyph-background.module.scss'
import sp from '../styles/stack-prompt.module.scss'
import GlyphBackground from '../components/shared/glyph-background'
import { generateResumeGlyph } from '../components/resume/resume-glyph-content'

const DEFAULT_IMAGE = `${siteMetadata.siteUrl}${siteMetadata.defaultImage}`

// Place the PDF at the root of /public (alongside favicon.ico, robots.txt,
// etc.) so this path resolves correctly.
const RESUME_PDF_PATH = '/Maria_Campbell_Resume.pdf'

const SKILLS = [
	'Linux/Unix',
	'Command Line',
	'Shell Scripting',
	'Python',
	'Django',
	'Security & Encryption',
	'Git/GitHub',
	'JavaScript',
	'React',
	'Next.js',
	'Node.js',
	'SQL',
	'HTML5/CSS3',
	'Technical Writing & Documentation',
]

const LANGUAGES = ['English', 'French', 'Serbo-Croatian', 'some Spanish']

// Rotates through the 4 title-pill colors, one per section heading, so
// consecutive titles don't repeat the same color.
const TITLE_COLOR_CLASSES = [
	'title-rust',
	'title-teal',
	'title-violet',
	'title-pink',
]

const EXPERIENCE = [
	{
		title: 'Founder/President',
		org: 'Inter-Global Media Network, Inc.',
		location: 'New York, NY',
		dates: '2012 – Present',
		description:
			'Founded as a photography/video/social media venture; shifted focus to front-end and full-stack development in 2015. Built and maintained client and personal web applications, technical documentation, and presentations.',
	},
	{
		title: 'Trademark Database Management (via Inter-Global Media Network)',
		org: 'Calvin Klein, Inc.',
		location: 'New York, NY',
		dates: '2017 – 2019',
		description:
			"Managed Calvin Klein's Legal Department trademark system (CPI database), maintaining continuous communication with the legal team and applying close attention to detail.",
	},
	{
		title: 'Adjunct Professor, Communication Design',
		org: 'New York City College of Technology',
		location: 'Brooklyn, NY',
		dates: 'Jan. 2020 – Dec. 2022',
		description:
			'Taught Dynamic Web 1 (JavaScript) and Web Design 1. Transitioned coursework fully online during the COVID-19 pandemic using Blackboard, Discord, and GitHub for course delivery and student collaboration. Mentored students individually outside class sessions.',
	},
]

const ACHIEVEMENTS = [
	{
		label: 'Presenter',
		detail: 'React Workflow Presentation — React NYC Meetup, 9.28.17',
	},
	{
		label: 'Presenter',
		detail: 'Evolution in Design and Development — React Camp, 11.18.17',
	},
	{
		label: 'Open',
		detail: 'to speaking and presenting opportunities',
	},
]

const EDUCATION = [
	{
		institution: 'The Linux Foundation',
		program: 'An Introduction to Linux (LFS101)',
		dates: 'July 2024 – In Progress',
	},
	{
		institution: 'LinuxJourney.com',
		program: '',
		dates: 'July 2024 – In Progress',
	},
	{
		institution: 'Google Cybersecurity Professional Certificate, Coursera',
		program: '',
		dates: 'July 2023 – Oct. 2023',
	},
	{
		institution: 'New York Coding and Design Academy, NY NY',
		program: 'Evening Full Stack JavaScript Intensive',
		dates: 'Jan. 2018 – June 2018',
	},
	{
		institution: 'New York Coding and Design Academy, NY NY',
		program: 'Web Development 100 & Front End Development 101',
		dates: 'Sept. 2015 – Feb. 2016',
	},
	{
		institution:
			'Columbia University School of International and Public Affairs, NY NY',
		program:
			'Master of Arts, International Affairs — International Finance and Banking, Eastern European Studies concentration',
		dates: '',
	},
	{
		institution: 'Barnard College, NY NY',
		program: 'Bachelor of Arts, French Literature',
		dates: '',
	},
	{
		institution: 'Fashion Institute of Technology, NY NY',
		program: 'A.A.S., Fashion Design, Lingerie Specialization',
		dates: '',
	},
]

function ResumePage() {
	const url = `${siteMetadata.siteUrl}/resume`

	return (
		<Fragment>
			<Head
				title="Resume"
				excerpt="Maria D. Campbell's resume — Linux/Unix, Python/Django, security, and full-stack JavaScript experience, projects, and background."
				url={url}
				author={siteMetadata.author}
				image={DEFAULT_IMAGE}
				imageAlt="Maria D. Campbell — Resume"
				keywords="resume, cv, linux, unix, python, django, security, encryption, git, github, javascript, react, next.js, node.js, sql, html5, css3, technical writing, full stack developer, new york"
				type="website"
			/>
			<div className={bgClasses['page-wrapper']}>
				<GlyphBackground generateContent={generateResumeGlyph} />
				<section className={classes['resume-section']}>
					<header className={classes['resume-header']}>
						<h1 className={classes.name}>
							<span className={classes['name-symbol']}>$</span>{' '}
							cat maria d. campbell
						</h1>
						<div className={classes['contact-list']}>
							<span className={classes['contact-item']}>
								New York, NY
							</span>
							<span className={classes['contact-item']}>
								<a href="mailto:interglobalmedia@gmail.com">
									interglobalmedia@gmail.com
								</a>
							</span>
							<span className={classes['contact-item']}>
								<a
									href="https://linkedin.com/in/mariacampbell"
									target="_blank"
									rel="noreferrer"
								>
									linkedin.com/in/mariacampbell
								</a>
							</span>
							<span className={classes['contact-item']}>
								<a
									href="https://github.com/interglobalmedia"
									target="_blank"
									rel="noreferrer"
								>
									github.com/interglobalmedia
								</a>
							</span>
						</div>
						<a
							className={classes['download-link']}
							href={RESUME_PDF_PATH}
							download
						>
							Download PDF
						</a>
					</header>

					<article className={classes.panel}>
						<h2>
							<span className={classes['plain-symbol']}>$</span>
							<span className={classes[TITLE_COLOR_CLASSES[0]]}>
								cat summary
							</span>
						</h2>
						<p className={classes.info}>
							Developer with a focus on Linux/Unix systems and
							Python/Django, and a writer who documents what I
							build along the way. I dig into why one approach
							beats another, not just how either one works — an
							instinct that shows up equally in my code and my
							writing. Available for remote-first work.
						</p>
					</article>

					<article className={classes.panel}>
						<h2>
							<span className={classes['plain-symbol']}>$</span>
							<span className={classes[TITLE_COLOR_CLASSES[1]]}>
								ls experience
							</span>
						</h2>
						{EXPERIENCE.map((job) => (
							<div key={job.title} className={classes.job}>
								<p className={classes['job-title']}>
									{job.title}
								</p>
								<p className={classes['job-meta']}>
									{job.org} — {job.location} · {job.dates}
								</p>
								<p className={classes.info}>
									{job.description}
								</p>
							</div>
						))}
					</article>

					<article className={classes.panel}>
						<h2>
							<span className={classes['plain-symbol']}>$</span>
							<span className={classes[TITLE_COLOR_CLASSES[2]]}>
								ls skills
							</span>
						</h2>
						<p className={sp.prompt}>
							<span
								className={`${sp['tag-list']} ${sp['plain-tags']}`}
							>
								{SKILLS.map((skill) => (
									<span key={skill} className="skill-tag">
										{skill}
									</span>
								))}
							</span>
						</p>
					</article>

					<article className={classes.panel}>
						<h2>
							<span className={classes['plain-symbol']}>$</span>
							<span className={classes[TITLE_COLOR_CLASSES[3]]}>
								cat projects
							</span>
						</h2>
						<p className={classes.info}>
							Selected work spanning Python/Django, Linux,
							security, and full-stack JavaScript, viewable at{' '}
							<Link href="/projects">
								mariadcampbell.com/projects
							</Link>
							. Python, Linux, and security-focused projects
							(Django Boards, file encryption, steganography
							versus cryptography, Wireshark versus tcpdump) are
							currently in the process of being published to the
							site.
						</p>
					</article>

					<article className={classes.panel}>
						<h2>
							<span className={classes['plain-symbol']}>$</span>
							<span className={classes[TITLE_COLOR_CLASSES[0]]}>
								ls achievements
							</span>
						</h2>
						<div className={classes['prompt-list']}>
							{ACHIEVEMENTS.map((item, index) => (
								<p
									key={`${item.label}-${index}`}
									className={classes.info}
								>
									<strong>{item.label}:</strong> {item.detail}
								</p>
							))}
						</div>
					</article>

					<article className={classes.panel}>
						<h2>
							<span className={classes['plain-symbol']}>$</span>
							<span className={classes[TITLE_COLOR_CLASSES[1]]}>
								ls education
							</span>
						</h2>
						<div className={classes['prompt-list']}>
							{EDUCATION.map((entry) => (
								<p
									key={`${entry.institution}-${entry.program}`}
									className={classes.info}
								>
									<strong>{entry.institution}</strong>
									{entry.program && <> — {entry.program}</>}
									{entry.dates && (
										<span className={classes['job-meta']}>
											{' '}
											{entry.dates}
										</span>
									)}
								</p>
							))}
						</div>
					</article>

					<article className={classes.panel}>
						<h2>
							<span className={classes['plain-symbol']}>$</span>
							<span className={classes[TITLE_COLOR_CLASSES[2]]}>
								ls languages
							</span>
						</h2>
						<p className={sp.prompt}>
							<span
								className={`${sp['tag-list']} ${sp['plain-tags']}`}
							>
								{LANGUAGES.map((language) => (
									<span key={language} className="skill-tag">
										{language}
									</span>
								))}
							</span>
						</p>
					</article>
				</section>
			</div>
		</Fragment>
	)
}

export default ResumePage
