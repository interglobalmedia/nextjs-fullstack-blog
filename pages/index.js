import { Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Hero from '../components/home-page/hero'
import { getFeaturedPosts } from '../lib/posts-util'

const DynamicFeaturedPosts = dynamic(() => import('../components/home-page/featured-posts'))

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <title>Maria D. Campbell's Next Blog</title>
        <meta
          name="description"
          content="I blog about fullstack development as well as macOS, Command Line, and Git."
        />
      </Head>
      <Hero />
      <DynamicFeaturedPosts posts={props.posts} />
    </Fragment>
  )
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts()

  return {
    props: {
      posts: featuredPosts
    }
  }
}

export default HomePage