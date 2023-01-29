import { Fragment } from 'react'
import Head from 'next/head'
import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'
import { getFeaturedPosts } from '../lib/posts-util'


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
      <FeaturedPosts posts={props.posts} />
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