import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from "next/legacy/image";
import PostHeader from './post-header'
import { getTagLink } from '../get-tag-link'
import classes from '../../../styles/post-content.module.scss'

function PostContent(props) {
    const { post } = props
    const imagePath = `/images/posts/${post.slug}/${post.image}`

    const customRenderers = {
        p(paragraph) {
            const { node } = paragraph

            if (node.children[0].tagName === 'img') {
                const image = node.children[0]

                return (
                    <div className={classes.image}>
                        <Image src={`/images/posts/${post.slug}/${image.properties.src}`} alt={image.properties.alt} width={600} height={300} layout="responsive" />
                    </div>
                )
            }
            return <p>{paragraph.children}</p>
        },
        code(code) {
            const languageArray = code.className.split("-");
            const language = languageArray[1];
     
            return (
                <SyntaxHighlighter language={language} style={atomDark}>
                    {code.children[0]}
                </SyntaxHighlighter>
            );
        }
    }
    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            {<p>{post.tags.map(tag => getTagLink(tag)).reduce((prev, curr) => [prev, ', ', curr])}</p>}
            <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
        </article>
    )
}

export default PostContent