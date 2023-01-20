import { Fragment } from 'react'
import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'

const DUMMY_POSTS = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Nextjs',
    author: 'Maria D. Campbell',
    image: 'getting-started-nextjs.png',
    excerpt: 'Nextjs is the React framework for production. It makes building fullstack React apps and sites a breeze, and ships with built-in SSR.',
    date: '2023-01-17'
  },
  {
    slug: 'getting-started-with-nextjs2',
    title: 'Getting Started with Nextjs',
    author: 'Maria D. Campbell',
    image: 'getting-started-nextjs.png',
    excerpt: 'Nextjs is the React framework for production. It makes building fullstack React apps and sites a breeze, and ships with built-in SSR.',
    date: '2023-01-17'
  },
  {
    slug: 'getting-started-with-nextjs3',
    title: 'Getting Started with Nextjs',
    author: 'Maria D. Campbell',
    image: 'getting-started-nextjs.png',
    excerpt: 'Nextjs is the React framework for production. It makes building fullstack React apps and sites a breeze, and ships with built-in SSR.',
    date: '2023-01-17'
  },
  {
    slug: 'getting-started-with-nextjs4',
    title: 'Getting Started with Nextjs',
    author: 'Maria D. Campbell',
    image: 'getting-started-nextjs.png',
    excerpt: 'Nextjs is the React framework for production. It makes building fullstack React apps and sites a breeze, and ships with built-in SSR.',
    date: '2023-01-17'
  }
]
function HomePage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  )
}

export default HomePage