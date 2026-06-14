import NextHead from 'next/head'

const SITE_NAME = 'LetsBSocial1 | Maria D. Campbell'
const TWITTER_HANDLE = '@letsbsocial1'

export default function Head({
	children,
	title,
	excerpt,
	date,
	lastModified,
	author,
	image,
	imageAlt,
	keywords,
	url,
	type = 'website',
	noindex = false,
}) {
	const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME

	// Build JSON-LD only for article pages that have the minimum required fields
	const jsonLd =
		type === 'article' && title && url
			? {
					'@context': 'https://schema.org',
					'@type': 'BlogPosting',
					headline: title,
					description: excerpt || undefined,
					url,
					...(image && { image }),
					...(date && {
						datePublished: new Date(date).toISOString(),
					}),
					...(lastModified && {
						dateModified: new Date(lastModified).toISOString(),
					}),
					...(author && {
						author: {
							'@type': 'Person',
							name: author,
						},
					}),
					publisher: {
						'@type': 'Organization',
						name: SITE_NAME,
					},
				}
			: null

	return (
		<NextHead>
			{/* Indexing */}
			{noindex && (
				<meta key="robots" name="robots" content="noindex, nofollow" />
			)}

			{/* Basic metadata */}
			<meta key="title" name="title" content={pageTitle} />
			{excerpt && (
				<meta key="description" name="description" content={excerpt} />
			)}
			{keywords && (
				<meta key="keywords" name="keywords" content={keywords} />
			)}
			{author && <meta key="author" name="author" content={author} />}

			{/* Article timestamps */}
			{date && (
				<meta
					key="article:published_time"
					property="article:published_time"
					content={new Date(date).toISOString()}
				/>
			)}
			{lastModified && (
				<meta
					key="article:modified_time"
					property="article:modified_time"
					content={new Date(lastModified).toISOString()}
				/>
			)}
			{author && type === 'article' && (
				<meta
					key="article:author"
					property="article:author"
					content={author}
				/>
			)}

			{/* Open Graph */}
			<meta
				key="og:site_name"
				property="og:site_name"
				content={SITE_NAME}
			/>
			<meta key="og:type" property="og:type" content={type} />
			<meta key="og:title" property="og:title" content={pageTitle} />
			{excerpt && (
				<meta
					key="og:description"
					property="og:description"
					content={excerpt}
				/>
			)}
			{url && <meta key="og:url" property="og:url" content={url} />}
			{image && (
				<>
					<meta key="og:image" property="og:image" content={image} />
					<meta
						key="og:image:alt"
						property="og:image:alt"
						content={imageAlt || title || SITE_NAME}
					/>
					<meta
						key="og:image:width"
						property="og:image:width"
						content="1200"
					/>
					<meta
						key="og:image:height"
						property="og:image:height"
						content="630"
					/>
				</>
			)}

			{/* Twitter / X Card */}
			<meta
				key="twitter:card"
				name="twitter:card"
				content="summary_large_image"
			/>
			<meta
				key="twitter:site"
				name="twitter:site"
				content={TWITTER_HANDLE}
			/>
			<meta
				key="twitter:creator"
				name="twitter:creator"
				content={TWITTER_HANDLE}
			/>
			<meta
				key="twitter:title"
				name="twitter:title"
				content={pageTitle}
			/>
			{excerpt && (
				<meta
					key="twitter:description"
					name="twitter:description"
					content={excerpt}
				/>
			)}
			{image && (
				<>
					<meta
						key="twitter:image"
						name="twitter:image"
						content={image}
					/>
					<meta
						key="twitter:image:alt"
						name="twitter:image:alt"
						content={imageAlt || title || SITE_NAME}
					/>
				</>
			)}

			{/* Canonical */}
			{url && <link key="canonical" rel="canonical" href={url} />}

			{/* Page title */}
			<title key="pageTitle">{pageTitle}</title>

			{/* JSON-LD structured data */}
			{jsonLd && (
				<script
					key="json-ld"
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}

			{children}
		</NextHead>
	)
}
