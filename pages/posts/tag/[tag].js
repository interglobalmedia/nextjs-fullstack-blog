import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { getAllPosts, getAllPostsByTag } from '../../../lib/posts-util'
import Head from 'next/head'
import classes from '../../../styles/tag.module.scss'

const DynamicPostItem = dynamic(() => import('../../../components/posts/post-item'))

export default function Tag(props) {
    const { posts, tag } = props
    
    return (
        <Fragment>
            <Head>
                <title>Post Tags</title>
                <meta name="description" content={posts.excerpt} />
            </Head>
            <section className={classes.tag}>
                <h1>tag: {tag}</h1>
                {posts.map((post) => (
                    <DynamicPostItem key={post.slug} post={post} tag={post.tag} />
                ))}
            </section>
        </Fragment>
    )
}

export async function getStaticPaths() {
    const posts = getAllPosts()
    const tags = new Set(posts.flatMap((post) => post.tags))

    return {
        paths: [...tags].map((tag) => {
            return {
                params: {
                    tag
                }
            }
        }),
        fallback: false
    }
}

export async function getStaticProps({params: { tag }}) {
    const posts = getAllPostsByTag({ tag })
    
    return {
        props: {
            posts,
            tag
        }
    }
}