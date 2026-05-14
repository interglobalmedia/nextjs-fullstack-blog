import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'data', 'blog')

export function getPostFiles() {
	return fs.readdirSync(postsDirectory)
}

export function getPostData(postIdentifier) {
	const postSlug = postIdentifier.replace(/\.mdx$/, '')
	const filePath = path.join(postsDirectory, `${postSlug}.mdx`)
	const fileContent = fs.readFileSync(filePath, 'utf-8')

	const { data, content } = matter(fileContent)

	const postData = {
		slug: postSlug,
		...data,
		content,
	}
	return postData
}

export function getAllPosts() {
	const postFiles = getPostFiles()

	const allPosts = postFiles.map((postFile) => {
		return getPostData(postFile)
	})

	const sortedPosts = allPosts.sort((postA, postB) =>
		postA.date > postB.date ? -1 : 1,
	)

	const publishedPosts = sortedPosts.filter((post) => post.isPublished)

	return publishedPosts
}

export function getAllPostsByTag({ tag }) {
	const posts = getAllPosts()
	return posts.filter((post) => post.tags.includes(tag))
}

export function getPostMetadata(postIdentifier) {
	const postSlug = postIdentifier.replace(/\.mdx$/, '')
	const filePath = path.join(postsDirectory, `${postSlug}.mdx`)
	const fileContent = fs.readFileSync(filePath, 'utf-8')
	const { data } = matter(fileContent) // no content

	return {
		slug: postSlug,
		...data,
	}
}

export function getAllPostsMetadata() {
	const postFiles = getPostFiles()

	const allPosts = postFiles.map((postFile) => getPostMetadata(postFile))

	const sortedPosts = allPosts.sort((postA, postB) =>
		postA.date > postB.date ? -1 : 1,
	)

	return sortedPosts.filter((post) => post.isPublished)
}

export function getFeaturedPosts() {
	return getAllPostsMetadata().filter(
		(post) => post.isFeatured && post.isPublished,
	)
}
