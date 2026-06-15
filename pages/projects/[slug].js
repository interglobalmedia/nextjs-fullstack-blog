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
	if (!project) return null

	const url = `${siteMetadata.siteUrl}/projects/${project.slug}`
	const ogImageFile = project.ogImage ?? project.image
	const image = `${siteMetadata.siteUrl}/images/projects/${project.slug}/${ogImageFile}`

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
				noindex={!project.isPublished}
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

	if (!project) return { notFound: true }

	if (!project.isPublished) return { notFound: true }

	return {
		props: { project },
	}
}
