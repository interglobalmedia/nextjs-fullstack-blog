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
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getProjectTagLink } from './get-project-tag-link'
import classes from '../../styles/project-detail.module.scss'
import getReadTime from '../../lib/utils/read-time'
import Share from '../share/share'
import CodeCopyBtn from '../posts/post-detail/code-copy-btn'
import Giscus from '../comments/giscus'
import { generateSlug } from '../../lib/utils/generate-slug'
import ScrollStep from '../buttons/scroll-step'
import ScrollTop from '../buttons/scroll-top'
import siteMetadata from '../../data/siteMetadata'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('django', django)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('shell', sh)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('md', md)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('scss', scss)

const DynamicSocialShareIcon = dynamic(
	() => import('../../helpers/social-icons-map.js'),
)

function ProjectDetail({ project }) {
	const {
		title,
		author,
		slug,
		image,
		content,
		tags,
		repository,
		website,
		more,
		date,
		lastModified,
	} = project

	const readTime = getReadTime(content)

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long',
		hour: 'numeric',
		minute: 'numeric',
	}

	const formattedDate = new Date(date).toLocaleDateString('en-US', options)
	const lastModifiedFormattedDate = new Date(lastModified).toLocaleDateString(
		'en-US',
		options,
	)

	const imagePath = `/images/projects/${slug}/${image}`
	const url = `${siteMetadata.siteUrl}/projects/${slug}`
	const combinatorIntent = `${siteMetadata.siteUrl}/projects/${slug} `

	const customRenderers = {
		p(paragraph) {
			const { node } = paragraph

			if (node.children[0].tagName === 'img') {
				const image = node.children[0]
				const src = image.properties.src
				const isGif = src.endsWith('.gif')

				return (
					<div className={classes.image}>
						<Image
							src={`/images/projects/${slug}/${image.properties.src}`}
							alt={image.properties.alt}
							width={600}
							height={400}
							sizes="100vw"
							unoptimized={isGif}
							loading="eager"
							style={{
								objectFit: 'contain',
								width: '100%',
								height: 'auto',
							}}
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

		h4({ node, ...props }) {
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
				<h4 id={slug}>
					<a
						className={classes['heading-four']}
						href={`#${slug}`}
						{...props}
					></a>
				</h4>
			)
		},

		pre({ node, children, ...props }) {
			return (
				<pre className="project-pre" {...props}>
					<CodeCopyBtn>{children}</CodeCopyBtn>
					{children}
				</pre>
			)
		},
		code({ node, inline, className, children, ...props }) {
			const match = /language-(\w+)/.exec(className || '')
			return !inline && match ? (
				<SyntaxHighlighter
					style={atomDark}
					language={match[1]}
					PreTag="div"
					{...props}
				>
					{String(children).replace(/\n$/, '')}
				</SyntaxHighlighter>
			) : (
				<span className="inline-code" {...props}>
					{children}
				</span>
			)
		},
	}
	return (
		<Fragment>
			<article className={`content ${classes.content}`}>
				<h1>{title}</h1>
				{author && (
					<p className={`author ${classes.author}`}>By {author}</p>
				)}
				<p className={`read-time ${classes['read-time']}`}>
					{formattedDate} | {readTime} min read
				</p>
				<p className={`dates ${classes.dates}`}>
					Last modified on {lastModifiedFormattedDate}
				</p>
				<p className={`tags ${classes.tags}`}>
					{tags.map((tag, index) => (
						<Fragment key={tag}>
							{getProjectTagLink(tag)}
							{index < tags.length - 1 && ', '}
						</Fragment>
					))}
				</p>
				<div className={classes['share-icons-wrapper']}>
					{image && (
						<div className={classes['project-image']}>
							<Image
								src={imagePath}
								alt={title}
								width={600}
								height={400}
								sizes="100vw"
								unoptimized={image?.endsWith('.gif')}
								style={{
									objectFit: 'contain',
									width: '100%',
									height: 'auto',
								}}
							/>
						</div>
					)}
				</div>
				<ReactMarkdown
					components={customRenderers}
					rehypePlugins={[rehypeRaw]}
					remarkPlugins={[remarkGfm]}
					remarkRehypeOptions={{ passThrough: ['link'] }}
				>
					{content}
				</ReactMarkdown>
				<div className={`links ${classes.links}`}>
					{repository && (
						<a
							href={repository}
							target="_blank"
							rel="noopener noreferrer"
						>
							View Repository
						</a>
					)}
					{website && (
						<a
							href={website}
							target="_blank"
							rel="noopener noreferrer"
						>
							View Live Site
						</a>
					)}
					{more && more !== website && (
						<a
							href={more}
							target="_blank"
							rel="noopener noreferrer"
						>
							Learn More
						</a>
					)}
				</div>
				<div className={classes['svg-wrapper']}>
					<h2
						className={`social-share-heading ${classes['social-share-heading']}`}
					>
						Social Share:
					</h2>
					<div className={classes['share-icons-row']}>
						<div
							className={`share-hacker-news ${classes['share-hacker-news']}`}
						>
							<DynamicSocialShareIcon
								name="social-hacker-news"
								href={`https://news.ycombinator.com/submitlink?u=${combinatorIntent}&t=${title}`}
								size="6"
							/>
						</div>
						<Share title={title} url={url} />
					</div>
				</div>
				<Giscus />
			</article>
			<ScrollStep />
			<ScrollTop />
		</Fragment>
	)
}

export default ProjectDetail
