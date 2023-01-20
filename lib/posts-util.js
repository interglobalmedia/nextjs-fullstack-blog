import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'data/posts')

function getPostData(fileName) {
    const filePath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(filePath)
    
    const { data, content } = matter(fileContent)

    const postSlug = fileName.replace(/\.mdx$/, '')

    const postData = {
        slug: postSlug,
        ...data,
        content
    }
    return postData
}

export function getAllPosts() {
    const postFiles = fs.readdirSync(postsDirectory)

    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile)
    })

    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1)
    
    return sortedPosts
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts()

    const featuredPosts = allPosts.filter(post => post.isFeatured)

    return featuredPosts
}