import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import {
	getProjectsByTag,
	getAllProjectTags,
} from '../../../../../lib/projects-util'
import ProjectsPagination from '../../../../../components/pagination/projects-pagination'
import { PROJECTS_PER_TAG_PAGE } from '../../[tag]'
import classes from '../../../../../styles/tag.module.scss'
import ScrollStep from '../../../../../components/buttons/scroll-step'
import ScrollTop from '../../../../../components/buttons/scroll-top'

const DynamicProjectCard = dynamic(
	() => import('../../../../../components/projects/project-card'),
)

export default function ProjectTagPage({
	projects,
	tag,
	currentPage,
	totalPages,
}) {
	return (
		<Fragment>
			<Head>
				<title>
					projects tag: {tag} — page {currentPage}
				</title>
			</Head>
			<section className={classes.tag}>
				<h1>projects tag: {tag}</h1>
				<ul style={{ listStyle: 'none', padding: 0 }}>
					{projects.map((project) => (
						<DynamicProjectCard
							key={project.slug}
							title={project.title}
							author={project.author}
							repository={project.repository}
							website={project.website}
							summary={project.summary}
							imgSrc={project.image}
							tags={project.tags}
							slug={project.slug}
							more={project.more}
						/>
					))}
				</ul>
				{totalPages > 1 && (
					<ProjectsPagination
						currentPage={currentPage}
						totalPages={totalPages}
						tag={tag}
					/>
				)}
			</section>
			<ScrollStep />
			<ScrollTop />
		</Fragment>
	)
}

export async function getStaticPaths() {
	const tags = getAllProjectTags()
	const paths = []
	for (const tag of tags) {
		const tagProjects = getProjectsByTag(tag)
		const totalPages = Math.ceil(tagProjects.length / PROJECTS_PER_TAG_PAGE)
		for (let page = 2; page <= totalPages; page++) {
			paths.push({ params: { tag, page: String(page) } })
		}
	}
	return { paths, fallback: false }
}

export async function getStaticProps({ params: { tag, page } }) {
	const currentPage = parseInt(page)
	const allTagProjects = getProjectsByTag(tag)
	const totalPages = Math.ceil(allTagProjects.length / PROJECTS_PER_TAG_PAGE)
	const start = (currentPage - 1) * PROJECTS_PER_TAG_PAGE
	const projects = allTagProjects.slice(start, start + PROJECTS_PER_TAG_PAGE)
	return {
		props: { projects, tag, currentPage, totalPages },
	}
}
