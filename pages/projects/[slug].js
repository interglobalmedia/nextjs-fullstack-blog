import { Fragment } from 'react'
import Head from 'next/head'
import { getProjectData, getProjectFiles } from '../../lib/projects-util'
import ProjectDetail from '../../components/projects/project-detail'
import ScrollTop from '../../components/buttons/scroll-top'
import ScrollStep from '../../components/buttons/scroll-step'

export default function ProjectDetailPage({ project }) {
	return (
		<Fragment>
			<Head>
				<title>{project.title}</title>
				<meta name="description" content={project.summary} />
			</Head>
			<ProjectDetail project={project} />
			<div className="buttons-container">
				<ScrollStep />
				<ScrollTop />
			</div>
		</Fragment>
	)
}

export function getStaticPaths() {
	const projectFiles = getProjectFiles()
	const slugs = projectFiles.map((file) => file.replace(/\.mdx$/, ''))

	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	}
}

export function getStaticProps({ params }) {
	const { slug } = params
	const project = getProjectData(slug)

	return {
		props: { project },
	}
}
