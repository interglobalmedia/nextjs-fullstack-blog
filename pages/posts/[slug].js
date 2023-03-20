import { Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { getPostData, getPostFiles } from '../../lib/posts-util'
import siteMetadata from '../../data/siteMetadata'

const DynamicPostContent = dynamic(() => import('../../components/posts/post-detail/post-content'))
const DynamicScrollTop = dynamic(() => import('../../components/buttons/scroll-top'))
const DynamicScrollStep = dynamic(() => import('../../components/buttons/scroll-step'))

function PostDetailPage(props) {
    const { post, ogImage } = props
    const url = `${siteMetadata.siteUrl}/posts/${post.slug}`
return (
    <Fragment>
        <Head>
            <title>{post.title}</title>
            {url && <link rel="canonical" href={url} />}
            <meta name="description" content={post.excerpt} />
            <meta name="author" content={post.author} />
            <meta name="robots" content="index,follow" />
            <meta property="og:image" content={ogImage} />
            <meta name="twitter:image" content={ogImage} />
        </Head>
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
    const { slug, title, author, date } = params

    const postData = getPostData(slug)

    const ogImage = `${siteMetadata.siteUrl}/api/og?title=${title}&author=${author}&date=${date}`

    return {
        props: {
            post: postData,
            ogImage: ogImage
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