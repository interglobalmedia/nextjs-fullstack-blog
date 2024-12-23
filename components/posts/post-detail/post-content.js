'use client'
import ReactMarkdown from 'react-markdown'
import { Fragment } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import django from 'react-syntax-highlighter/dist/cjs/languages/prism/django'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import sh from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import md from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import dynamic from 'next/dynamic'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Image from 'next/legacy/image'
import { getTagLink } from '../get-tag-link'
import classes from '../../../styles/post-content.module.scss'
import getReadTime from '../../../lib/utils/read-time'
import Share from '../../share/share'
import CodeCopyBtn from './code-copy-btn'
import Giscus from '../../comments/giscus'
import { generateSlug } from '../../../lib/utils/generate-slug'
import ScrollStep from '../../buttons/scroll-step'
import ScrollTop from '../../buttons/scroll-top'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('django', django)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('shell', sh)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('md', md)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('scss', scss)

const DynamicPostHeader = dynamic(() => import('./post-header'))
const DynamicSocialShareIcon = dynamic(() =>
	import('../../../helpers/social-icons-map.js'),
)

function PostContent(props) {
	// Add the CodeCopyBtn component to our PRE element
	const Pre = ({ children }) => (
		<pre className={classes['blog-pre']}>
			<CodeCopyBtn>{children}</CodeCopyBtn>
			{children}
		</pre>
	)
	const { post, handleSocialShare } = props
	const readTime = getReadTime(post.content)
	const imagePath = `/images/blog/${post.slug}/${post.image}`
	const url = `{siteMetadata.siteUrl}/blog/${post.slug}`

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long',
		hour: 'numeric',
		minute: 'numeric',
	}

	const formattedDate = new Date(post.date).toLocaleDateString(
		'en-US',
		options,
	)

	const lastModifiedFormattedDate = new Date(
		post.lastModified,
	).toLocaleDateString('en-US', options)

	const combinatorIntent = `${`https://www.mariadcampbell.com/blog/${post.slug}`} `

	const customRenderers = {
		p(paragraph) {
			const { node } = paragraph

			if (node.children[0].tagName === 'img') {
				const image = node.children[0]

				return (
					<div className={classes.image}>
						<Image
							src={`/images/blog/${post.slug}/${image.properties.src}`}
							alt={image.properties.alt}
							width={600}
							height={400}
							layout="responsive"
							objectFit="contain"
						/>
					</div>
				)
			}
			return <p>{paragraph.children}</p>
		},

		h2({ node, ...props }) {
			const children = Array.isArray(props.children)
				? props.children
				: [props.children]
			const heading = children
				.flatMap((element) =>
					typeof element === 'string'
						? element
						: element?.type !== undefined &&
						  typeof element.props.children === 'string'
						? element.props.children
						: [],
				)
				.join('')

			const slug = generateSlug(heading)

			return (
				<h2 id={slug}>
					<a
						className={classes['heading-two']}
						href={`#${slug}`}
						{...props}
					></a>
				</h2>
			)
		},

		h3({ node, ...props }) {
			const children = Array.isArray(props.children)
				? props.children
				: [props.children]
			const heading = children
				.flatMap((element) =>
					typeof element === 'string'
						? element
						: element?.type !== undefined &&
						  typeof element.props.children === 'string'
						? element.props.children
						: [],
				)
				.join('')

			const slug = generateSlug(heading)

			return (
				<h3 id={slug}>
					<a
						className={classes['heading-three']}
						href={`#${slug}`}
						{...props}
					></a>
				</h3>
			)
		},

		pre({ node, children, ...props }) {
			return (
				<pre className="blog-pre" {...props}>
					<CodeCopyBtn>{children}</CodeCopyBtn>
					{children}
				</pre>
			)
		},
		code({ node, inline, className, children, ...props }) {
			// const languageArray = code.className.split('-');
			// const language = languageArray[1];
			const match = /language-(\w+)/.exec(className || '')
			return !inline && match ? (
				// eslint-disable-next-line react/no-children-prop
				<SyntaxHighlighter
					children={String(children).replace(/\n$/, '')}
					style={atomDark}
					language={match[1]}
					PreTag="div"
					// className='pre-div'
					{...props}
				></SyntaxHighlighter>
			) : (
				<span className={`inline-code`} {...props}>
					{children}
				</span>
			)
		},
	}
	return (
		<Fragment>
			<article className={`content ${classes.content}`}>
				<DynamicPostHeader title={post.title} image={imagePath} />
				<div className={`${classes['share-icons-wrapper']}`}>
					<h1 className={`${classes['social-share-heading']}`}>
						Social Share:
					</h1>
					<div className={classes['svg-wrapper']}>
						<div
							className={`share-hacker-news ${classes['share-hacker-news']}`}
						>
							<DynamicSocialShareIcon
								name="social-hacker-news"
								href={`https://news.ycombinator.com/submitlink?u=
                                ${combinatorIntent}&t=${post.title}`}
								size="6"
							/>
						</div>
						<div
							className={`share-twitter ${classes['share-twitter']}`}
						></div>
						<Share
							title={post.title}
							url={url}
							onClick={handleSocialShare}
						/>
					</div>
				</div>
				<p>{`${formattedDate} | ${readTime} min read`}</p>
				<p>Last modified on {lastModifiedFormattedDate}</p>
				{
					<p>
						{post.tags
							.map((tag) => getTagLink(tag))
							.reduce((prev, curr) => [prev, ', ', curr])}
					</p>
				}
				<ReactMarkdown
					components={customRenderers}
					rehypePlugins={[rehypeRaw]}
					remarkPlugins={[remarkGfm]}
					remarkRehypeOptions={{ passThrough: ['link'] }}
				>
					{post.content}
				</ReactMarkdown>
				<Giscus />
			</article>
			<ScrollStep />
			<ScrollTop />
		</Fragment>
	)
}

export default PostContent
