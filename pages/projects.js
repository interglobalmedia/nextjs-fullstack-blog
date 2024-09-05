import { useState } from 'react'
import Head from 'next/head'
import siteMetadata from '../data/siteMetadata'
import projectsData from '../data/projectsData'
import Card from '../components/project/project-card'
import ScrollTop from '../components/buttons/scroll-top'
import ScrollStep from '../components/buttons/scroll-step'
import classes from '../styles/all-projects.module.scss'

export default function Projects({ initialDisplayPosts = [] }) {
	const [searchValue, setSearchValue] = useState('')
	const filteredProjectPosts = projectsData.filter((project) => {
		const searchContent =
			project.title + project.summary + project.tags.join(' ')
		return searchContent.toLowerCase().includes(searchValue.toLowerCase())
	})
	// If initialDisplayPosts exist, display it if no searchValue is specified
	const displayProjectPosts =
		initialDisplayPosts.length > 0 && !searchValue
			? initialDisplayPosts
			: filteredProjectPosts
	return (
		<>
			<Head>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<title>Maria D. Campbell's Next Blog Blog Page</title>
				<meta
					name="description"
					content="Welcome to my Projects page, which contains all my projects."
				/>
			</Head>
			<main className={classes.main}>
				<section className={classes['projects-wrapper']}>
					<h1>All Projects</h1>
					<section className={classes['section-search']}>
						<input
							aria-label="Search projects"
							type="text"
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder="Search projects"
							className={`${classes.search} block w-full rounded-md bg-primary-500 border border-gray-300 px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100`}
						/>
						<svg
							className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</section>
				</section>
				<section className={classes['project-container']}>
					<article className={classes['project-card']}>
						{!filteredProjectPosts.length && 'No projects found.'}
						{displayProjectPosts
							.map((d) => (
								<Card
									key={d.id}
									title={d.title}
									summary={d.summary}
									imgSrc={d.imgSrc}
									href={d.href}
									tags={d.tags}
								/>
							))
							.sort()
							.reverse()}
					</article>
				</section>
			</main>
			<ScrollStep />
			<ScrollTop />
		</>
	)
}
