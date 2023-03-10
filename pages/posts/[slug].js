import { Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { getPostData, getPostFiles } from '../../lib/posts-util'

const DynamicPostContent = dynamic(() => import('../../components/posts/post-detail/post-content'))
const DynamicScrollTop = dynamic(() => import('../../components/buttons/scroll-top'))
const DynamicScrollStep = dynamic(() => import('../../components/buttons/scroll-step'))

function PostDetailPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name="description" content={props.post.excerpt} />
            </Head>
            <DynamicPostContent post={props.post} />
            <div className={`buttons-container`}
            >
                <DynamicScrollStep />
                <DynamicScrollTop />
            </div>
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