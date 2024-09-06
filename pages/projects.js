import dynamic from 'next/dynamic'
import Head from 'next/head'
import projectsData from '../data/projectsData'
import ScrollTop from '../components/buttons/scroll-top'
import ScrollStep from '../components/buttons/scroll-step'
import classes from '../styles/projects.module.scss'

const DynamicAllProjects = dynamic(() =>
	import('../components/project/all-projects'),
)

export const PROJECTS_PER_PAGE = 10

export async function getStaticProps() {
	const allProjectsData = JSON.parse(JSON.stringify(projectsData))
	const initialDisplayProjects = allProjectsData.slice(0, PROJECTS_PER_PAGE)
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(allProjectsData.length / PROJECTS_PER_PAGE),
	}
	return { props: { initialDisplayProjects, allProjectsData, pagination } }
}

export default function Projects({
	projects,
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
				projects={projects}
				initialDisplayProjects={initialDisplayProjects}
				pagination={pagination}
			/>
			<ScrollStep />
			<ScrollTop />
		</>
	)
}
