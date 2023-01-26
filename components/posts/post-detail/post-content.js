import ReactMarkdown from 'react-markdown'
import Image from "next/legacy/image";
import PostHeader from './post-header'
import classes from './post-content.module.scss'

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
                    <Image src={`/images/posts/${post.slug}/${image.properties.src}`} alt={image.properties.alt} width={600} height={300} layout="responsive"/>
                </div>
            )
        }
        return<p>{ paragraph.children }</p>
    }
    }
return (
    <article className={classes.content}>
        <PostHeader title={post.title} image={imagePath} />
        <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
)
}

export default PostContent