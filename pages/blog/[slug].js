import { Fragment } from 'react'
// import Head from 'next/head'
import dynamic from 'next/dynamic'
import { getPostData, getPostFiles } from '../../lib/posts-util.js'
import siteMetadata from '../../data/siteMetadata.js'
import Head from '../../components/seo/head.js'

const DynamicPostContent = dynamic(() => import('../../components/posts/post-detail/post-content.js'))
const DynamicScrollTop = dynamic(() => import('../../components/buttons/scroll-top.js'))
const DynamicScrollStep = dynamic(() => import('../../components/buttons/scroll-step.js'))

function PostDetailPage(props) {
    const { post } = props
    const url = `{siteMetadata.siteUrl}/blog/${post.slug}`
    return (
        <Fragment>
            <Head
                title={post.title}
                excerpt={post.excerpt}
                url={url}
                author={`Maria D. Campbell`}
            />
            <DynamicPostContent post={post} />
            <div className={`buttons-container`}
            >
                <DynamicScrollStep />
                <DynamicScrollTop />
            </div>
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const { params } = context
    const { slug } = params

    const post = getPostData(slug)

    return {
        props: {
            post
        },
        revalidate: 10
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