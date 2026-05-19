import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { getAllProjectsMetadata } from '../../../lib/projects-util'
import ScrollTop from '../../../components/buttons/scroll-top'
import ScrollStep from '../../../components/buttons/scroll-step'
import { PROJECTS_PER_PAGE } from '../../projects'

const DynamicAllProjects = dynamic(
	() => import('../../../components/projects/all-projects'),
)

export function getStaticPaths() {
	const totalProjects = getAllProjectsMetadata()
	const totalPages = Math.ceil(totalProjects.length / PROJECTS_PER_PAGE)
	const paths = Array.from({ length: totalPages }, (_, i) => ({
		params: { page: (i + 1).toString() },
	}))

	return {
		paths,
		fallback: false,
	}
}

export function getStaticProps(context) {
	const {
		params: { page },
	} = context

	const allProjects = getAllProjectsMetadata()
	const projects = allProjects.map(
		({
			title,
			author,
			repository,
			website,
			summary,
			slug,
			image,
			tags,
			more,
		}) => ({
			title,
			author,
			repository,
			website,
			summary,
			slug,
			image,
			tags,
			more: more ?? null,
		}),
	)

	const pageNumber = parseInt(page)
	const initialDisplayProjects = projects.slice(
		PROJECTS_PER_PAGE * (pageNumber - 1),
		PROJECTS_PER_PAGE * pageNumber,
	)
	const pagination = {
		currentPage: pageNumber,
		totalPages: Math.ceil(projects.length / PROJECTS_PER_PAGE),
	}

	return {
		props: {
			allProjects: projects,
			initialDisplayProjects,
			pagination,
		},
	}
}

export default function AllProjectsPage(props) {
	const { allProjects, initialDisplayProjects, pagination } = props
	return (
		<Fragment>
			<Head>
				<title>All Maria D. Campbell&apos;s Projects</title>
				<meta
					name="description"
					content="Browse all of Maria D. Campbell''s projects."
				/>
				<meta
					name="keywords"
					content="next.js, react, javascript, web audio api, node.js, socket.io, sass, scss, webpack, babel, eslint, prettier"
				/>
			</Head>
			<DynamicAllProjects
				allProjects={allProjects}
				initialDisplayProjects={initialDisplayProjects}
				pagination={pagination}
			/>
			<div className={`buttons-container`}>
				<ScrollStep />
				<ScrollTop />
			</div>
		</Fragment>
	)
}
