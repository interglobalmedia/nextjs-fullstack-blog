import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'data', 'projects')

export function getProjectFiles() {
	return fs.readdirSync(projectsDirectory)
}

export function getProjectData(projectIdentifier) {
	const projectSlug = projectIdentifier.replace(/\.mdx$/, '')
	const filePath = path.join(projectsDirectory, `${projectSlug}.mdx`)
	const fileContent = fs.readFileSync(filePath, 'utf-8')

	const { data, content } = matter(fileContent)

	return {
		...data,
		slug: projectSlug,
		content,
	}
}

export function getAllProjects() {
	const projectFiles = getProjectFiles()

	const allProjects = projectFiles.map((projectFile) => {
		return getProjectData(projectFile)
	})

	return allProjects.filter((project) => project.isPublished)
}

export function getAllProjectsMetadata() {
	const projectFiles = getProjectFiles()

	const allProjects = projectFiles.map((projectFile) => {
		const projectSlug = projectFile.replace(/\.mdx$/, '')
		const filePath = path.join(projectsDirectory, projectFile)
		const fileContent = fs.readFileSync(filePath, 'utf-8')
		const { data } = matter(fileContent)

		return {
			...data,
			slug: projectSlug,
		}
	})

	return allProjects.filter((project) => project.isPublished)
}

export function getProjectsByTag(tag) {
	return getAllProjects().filter((project) => project.tags.includes(tag))
}

export function getFeaturedProjects() {
	return getAllProjectsMetadata().filter(
		(project) => project.isFeatured && project.isPublished,
	)
}

export function getAllProjectTags() {
	const tags = getAllProjects().flatMap((project) => project.tags)
	return [...new Set(tags)].sort()
}
