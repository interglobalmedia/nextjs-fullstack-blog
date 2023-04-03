import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { getAllPosts } from '../../lib/posts-util'
import ScrollTop from '../../components/buttons/scroll-top'
import ScrollStep from '../../components/buttons/scroll-step'

const DynamicAllPosts = dynamic(() => import('../../components/posts/all-posts'))

function AllPostsPage(props) {
  const { posts } = props
  return (
    <Fragment>
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <title>All Maria D. Campbell's Posts</title>
        <meta name="description" content="Search through Maria D. Campbell's posts on fullstack development, macOS, Command Line, and Git." />
      </Head>
      <DynamicAllPosts posts={posts} />
      <div className={`buttons-container`}
      >
        <ScrollStep />
        <ScrollTop />
      </div>
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