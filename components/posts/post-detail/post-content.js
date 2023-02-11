import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from "next/legacy/image";
import PostHeader from './post-header'
import { getTagLink } from '../get-tag-link'
import classes from '../../../styles/post-content.module.scss'
import getReadTime from '../../../lib/utils/read-time'

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
            <PostHeader title={post.title} image={imagePath} />
            <p>{`${formattedDate} | ${readTime} min read`}</p>
            <p>Last modified on {lastModifiedFormattedDate}</p>
            {<p>{post.tags.map(tag => getTagLink(tag)).reduce((prev, curr) => [prev, ', ', curr])}</p>}
            <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
        </article>
    )
}

export default PostContent