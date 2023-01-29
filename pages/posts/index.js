import { Fragment } from 'react'
import Head from 'next/head'
import AllPosts from '../../components/posts/all-posts'
import { getAllPosts } from '../../lib/posts-util'

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <title>All Maria D. Campbell's Posts</title>
        <meta name="description" content="Search through Maria D. Campbell's posts on fullstack development, macOS, Command Line, and Git."  />
      </Head>
        <AllPosts posts={props.posts} />
      </Fragment>
    )
}

export function getStaticProps() {
  const allPosts = getAllPosts()

  return {
    props: {
      posts: allPosts
    }
  }
}

export default AllPostsPage