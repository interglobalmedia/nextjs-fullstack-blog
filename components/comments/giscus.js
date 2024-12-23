import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'

import siteMetadata from '../../data/siteMetadata'

const Giscus = () => {
	const [enableLoadComments, setEnabledLoadComments] = useState(true)
	const { theme, resolvedTheme } = useTheme()
	const commentsTheme =
		siteMetadata.comment.giscusConfig.themeURL === ''
			? theme === 'dark' || resolvedTheme === 'dark'
				? siteMetadata.comment.giscusConfig.darkTheme
				: siteMetadata.comment.giscusConfig.theme
			: siteMetadata.comment.giscusConfig.themeURL

	const COMMENTS_ID = 'comments-container'

	const LoadComments = useCallback(() => {
		setEnabledLoadComments(false)

		const {
			repo = process.env.NEXT_PUBLIC_GISCUS_REPO,
			repositoryId = process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
			category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
			categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
			mapping = 'pathname',
			reactions = '1',
			metadata = '1',
			inputPosition = 'top',
			theme = 'preferred_color_scheme',
			lang = 'en',
			dataLoading = 'lazy',
		} = siteMetadata?.comment?.giscusConfig

		const script = document.createElement('script')
		script.src = 'https://giscus.app/client.js'
		script.setAttribute('data-repo', repo)
		script.setAttribute('data-repo-id', repositoryId)
		script.setAttribute('data-category', category)
		script.setAttribute('data-category-id', categoryId)
		script.setAttribute('data-mapping', mapping)
		script.setAttribute('data-reactions-enabled', reactions)
		script.setAttribute('data-emit-metadata', metadata)
		script.setAttribute('data-input-position', inputPosition)
		script.setAttribute('data-theme', theme)
		script.setAttribute('data-lang', lang)
		script.setAttribute('data-loading', dataLoading)
		script.setAttribute('crossorigin', 'anonymous')
		script.async = true

		const comments = document.getElementById(COMMENTS_ID)
		if (comments) comments.appendChild(script)

		return () => {
			const comments = document.getElementById(COMMENTS_ID)
			if (comments) comments.innerHTML = ''
		}
	}, [])

	// Reload on theme change
	useEffect(() => {
		const iframe = document.querySelector('iframe.giscus-frame')
		if (!iframe) return
		LoadComments()
	}, [LoadComments])

	return (
		<div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
			{enableLoadComments && (
				<button onClick={LoadComments}>Load Comments</button>
			)}
			<div className="giscus" id={COMMENTS_ID} />
		</div>
	)
}

export default Giscus
