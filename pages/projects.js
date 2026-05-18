import dynamic from 'next/dynamic'
import Head from 'next/head'
import { getAllProjectsMetadata } from '../lib/projects-util'
import ScrollTop from '../components/buttons/scroll-top'
import ScrollStep from '../components/buttons/scroll-step'

const DynamicAllProjects = dynamic(
	() => import('../components/projects/all-projects'),
)

export const PROJECTS_PER_PAGE = 10

export async function getStaticProps() {
	const allProjects = getAllProjectsMetadata()
	const initialDisplayProjects = allProjects.slice(0, PROJECTS_PER_PAGE)
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(allProjects.length / PROJECTS_PER_PAGE),
	}
	return {
		props: { initialDisplayProjects, allProjects, pagination },
	}
}

export default function Projects({
	allProjects,
	initialDisplayProjects,
	pagination,
}) {
	return (
		<>
			<Head>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<title>Maria D. Campbell's Next Blog Projects Page</title>
				<meta
					name="description"
					content="Welcome to my Projects page, which contains all my projects."
				/>
			</Head>
			<DynamicAllProjects
				allProjects={allProjects}
				initialDisplayProjects={initialDisplayProjects}
				pagination={pagination}
			/>
			<ScrollStep />
			<ScrollTop />
		</>
	)
}
