import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import sh from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import md from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import dynamic from 'next/dynamic'
import Image from 'next/legacy/image'
import { getTagLink } from '../get-tag-link'
import classes from '../../../styles/post-content.module.scss'
import getReadTime from '../../../lib/utils/read-time'
import siteMetadata from '../../../data/siteMetadata'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('shell', sh)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('md', md)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('scss', scss)

const DynamicPostHeader = dynamic(() => import('./post-header'))
const DynamicSocialShareIcon = dynamic(() => import('../../../helpers/social-icons-map.js'))

function PostContent(props) {
    const { post } = props
    const readTime = getReadTime(post.content)
    const imagePath = `/images/posts/${post.slug}/${post.image}`

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
    };

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', options)

    const lastModifiedFormattedDate = new Date(post.lastModified).toLocaleDateString('en-US', options)

    const text = {
        twitterText: `I just read about`,
        combinatorText: `I just read an article about ${post.title} by ${siteMetadata.combinatorHandle} on ${siteMetadata.domain}`,
        redditText: `I just read an article about "${post.title}" by ${siteMetadata.redditHandle} on ${siteMetadata.domain}`,
        linkedinText: `I just read an article about "${post.title}" by "${siteMetadata.linkedinHandle}" on ${siteMetadata.domain}`,
    }

    const customRenderers = {
        p(paragraph) {
            const { node } = paragraph

            if (node.children[0].tagName === 'img') {
                const image = node.children[0]

                return (
                    <div className={classes.image}>
                        <Image src={`/images/posts/${post.slug}/${image.properties.src}`} alt={image.properties.alt} width={600} height={400} layout="responsive" />
                    </div>
                )
            }
            return <p>{paragraph.children}</p>
        },

        pre({ node, ...props }) {
            return (
                <pre className="pre" {...props} />
            )
        },
        code({ node, inline, className, children, ...props }) {
            // const languageArray = code.className.split("-");
            // const language = languageArray[1];
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ?
                (
                    // eslint-disable-next-line react/no-children-prop
                    <SyntaxHighlighter children={String(children).replace(/\n$/, '')}
                        style={atomDark}
                        language={match[1]}
                        // PreTag="div"
                        // className="pre-div"
                        {...props}>
                    </SyntaxHighlighter>
                ) : (
                    <span className={`inline-code`} {...props}>
                        {children}
                    </span>
                )
        }
    }
    return (
        <article className={`content ${classes.content}`}>
            <DynamicPostHeader title={post.title} image={imagePath} />
            <div className={`${classes['share-icons-wrapper']}`}>
                <h1 className={`${classes['social-share-heading']}`}>
                    Social Share:
                </h1>
                <div className={classes['svg-wrapper']}>
                    <div className={`share-hacker-news ${classes['share-hacker-news']}`}>
                        <DynamicSocialShareIcon
                            name="social-hacker-news"
                            href={`https://news.ycombinator.com/submitlink?u=${encodeURIComponent(
                                post.slug
                            )}&text=${encodeURIComponent(text.combinatorText)}%0A%0A`}
                            size="6"
                        />
                    </div>
                    <div className={`share-twitter ${classes['share-twitter']}`}>
                        <DynamicSocialShareIcon
                            name="twitter"
                            href={`https://twitter.com/intent/tweet?url=${siteMetadata.siteUrl}/posts/${post.slug}&text=${text.twitterText} "${post.title}" by @${siteMetadata.twitterHandle} on ${siteMetadata.domain}`}
                            size="6"
                        />
                    </div>
                    <div className={`share-reddit ${classes
                    ['share-reddit']}`}>
                        <DynamicSocialShareIcon
                            name="social-reddit"
                            href={`https://www.reddit.com/submit?title=${post.title}&url=${post.slug}&text=${text.redditText}`}
                            size="6"
                        />
                    </div>
                    <div className={`share-linkedin ${classes
                    ['share-linkedin']}`}>
                        <DynamicSocialShareIcon
                            name="linkedin"
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteMetadata.siteUrl}/posts/${post.slug}&title=${post.title}&summary=${post.excerpt}&text=${text.linkedinText}&source=mariadcampbell`}
                            size="6"
                        />
                    </div>
                </div>
            </div>
            <p>{`${formattedDate} | ${readTime} min read`}</p>
            <p>Last modified on {lastModifiedFormattedDate}</p>
            {<p>{post.tags.map(tag => getTagLink(tag)).reduce((prev, curr) => [prev, ', ', curr])}</p>}
            <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
        </article>
    )
}

export default PostContent