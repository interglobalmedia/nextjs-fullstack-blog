import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { getProjectData, getAllProjects } from '../../lib/projects-util.js'
import siteMetadata from '../../data/siteMetadata.js'
import Head from '../../components/seo/head.js'

const DynamicProjectDetail = dynamic(
	() => import('../../components/projects/project-detail.js'),
)
const DynamicScrollTop = dynamic(
	() => import('../../components/buttons/scroll-top.js'),
)
const DynamicScrollStep = dynamic(
	() => import('../../components/buttons/scroll-step.js'),
)

export default function ProjectDetailPage({ project }) {
	const url = `${siteMetadata.siteUrl}/projects/${project.slug}`
	const image = `${siteMetadata.siteUrl}/images/projects/${project.slug}/${project.image}`

	return (
		<Fragment>
			<Head
				title={project.title}
				excerpt={project.summary}
				url={url}
				author={project.author}
				image={image}
				imageAlt={project.title}
				date={project.date}
				lastModified={project.lastModified}
				type="article"
				schemaType="Article"
			/>
			<DynamicProjectDetail project={project} />
			<div className="buttons-container">
				<DynamicScrollStep />
				<DynamicScrollTop />
			</div>
		</Fragment>
	)
}

export function getStaticPaths() {
	const publishedProjects = getAllProjects()

	return {
		paths: publishedProjects.map((project) => ({
			params: { slug: project.slug },
		})),
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const { slug } = params
	const project = getProjectData(slug)

	// Guard: if the project exists but has been unpublished, treat as 404.
	// This handles the edge case where a cached or externally linked URL
	// is accessed after a project has been unpublished.
	if (!project.isPublished) {
		return { notFound: true }
	}

	return {
		props: { project },
	}
}
