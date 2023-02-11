import { Fragment } from 'react'
import Head from 'next/head'
import PostContent from '../../components/posts/post-detail/post-content'
import { getPostData, getPostFiles } from '../../lib/posts-util'

function PostDetailPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name="description" content={props.post.excerpt} />
            </Head>
            <PostContent post={props.post} />
        </Fragment>
    )
}

export function getStaticProps(context) {
    const { params } = context
    const { slug } = params
    
    const postData = getPostData(slug)

    return {
        props: {
            post: postData
        },
        revalidate: 600
    }
}

export function getStaticPaths() {
    const postFilenames = getPostFiles()

    const slugs = postFilenames.map((fileName) => fileName.replace(/\.mdx$/, ''))
    return {
        paths: slugs.map((slug) => ({
            params: { slug: slug }
        })),
        fallback: false
    }
}

export default PostDetailPage