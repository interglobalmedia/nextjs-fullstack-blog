import dynamic from 'next/dynamic'
import { useState } from 'react'
import Pagination from '../pagination/pagination'
import projectsData from '../../data/projectsData'
import classes from '../../styles/projects-grid.module.scss'

const DynamicProjectCard = dynamic(() => import('./project-card'))

function ProjectsGrid(props) {
	const { initialDisplayProjects = [], pagination } = props
	const [searchValue, setSearchValue] = useState('')
	const filteredProjects = projectsData.filter((frontMatter) => {
		const searchContent =
			frontMatter.title + frontMatter.excerpt + frontMatter.tags.join(' ')
		return searchContent.toLowerCase().includes(searchValue.toLowerCase())
	})

	/* If initialDisplayPosts exist, display it if no searchValue is specified */
	const displayProjects =
		initialDisplayProjects.length > 0 && !searchValue
			? initialDisplayProjects
			: filteredProjects

	return (
		<>
			<div className={`relative ${classes.relative}`}>
				<input
					aria-label="Search articles"
					type="text"
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder="Search articles"
					className={`${classes['projects-search']} block w-full rounded-md bg-primary-500 border border-gray-300 px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100`}
					autoFocus
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
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<ul className={`grid ${classes['projects-grid']}`}>
				{!filteredProjects.length && 'No posts found.'}
				{displayProjects.map((project) => (
					<DynamicProjectCard
						key={project.id}
						title={project.title}
						summary={project.summary}
						imgSrc={project.imgSrc}
						href={project.href}
						tags={project.tags}
					/>
				))}
			</ul>
			{pagination && pagination.totalPages > 1 && !searchValue && (
				<Pagination
					currentPage={pagination.currentPage}
					totalPages={pagination.totalPages}
				/>
			)}
		</>
	)
}

export default ProjectsGrid
