import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { getAllPosts } from '../../../lib/posts-util'
import ScrollTop from '../../../components/buttons/scroll-top'
import ScrollStep from '../../../components/buttons/scroll-step'
import { POSTS_PER_PAGE } from '../../blog'

const DynamicAllPosts = dynamic(() => import('../../../components/posts/all-posts'))

export function getStaticPaths() {
  const totalPosts = getAllPosts()
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export function getStaticProps(context) {
  const {
    params: { page },
  } = context
  const posts = getAllPosts()
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function AllPostsPage(props) {
  const { posts, initialDisplayPosts, pagination } = props
  return (
    <Fragment>
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <title>All Maria D. Campbell's Posts</title>
        <meta name='description' content="Search through Maria D. Campbell's posts on cybersecurity,  ethics in technology, fullstack development, macOS, Command Line, and Git." />
        <meta name='keywords' content='command line, cryptography, css, cybersecurity, django 4, encryption, git, jira, javascript, html, linux, kali linux, mysql, nodejs, npm, python, sql, windows, wordpress' />
      </Head>
      <DynamicAllPosts posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} />
      <div className={`buttons-container`}
      >
        <ScrollStep />
        <ScrollTop />
      </div>
    </Fragment>
  )
}
