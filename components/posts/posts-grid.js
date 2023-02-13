
import dynamic from 'next/dynamic'
import { useState } from 'react'
import classes from '../../styles/posts-grid.module.scss'

const DynamicPostItem = dynamic(() => import('./post-item'))

function PostsGrid(props) {
    const { posts, initialDisplayPosts = [] } = props
    const [searchValue, setSearchValue] = useState('')
    const filteredPosts = posts.filter((frontMatter) => {
        const searchContent =
            frontMatter.excerpt +
            frontMatter.tags.join(' ')
        return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })

    /* If initialDisplayPosts exist, display it if no searchValue is specified */
    const displayPosts =
        initialDisplayPosts.length > 0 && !searchValue
            ? initialDisplayPosts
            : filteredPosts

    return (
        <>
            <div className="relative">
                <input
                    aria-label="Search articles"
                    type="text"
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search articles"
                    className={`${classes.search} block w-full rounded-md bg-primary-500 border border-gray-300 px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100`}
                    autoFocus
                />
                <svg
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <ul
                className={`grid ${classes.grid}`}
            >
                {!filteredPosts.length && 'No posts found.'}
                {
                    displayPosts.map(post => (
                        <DynamicPostItem key={post.slug} post={post} />
                    ))
                }
            </ul>
        </>
    )
}

export default PostsGrid