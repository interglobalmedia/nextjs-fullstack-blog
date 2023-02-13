import '../styles/globals.scss'
import Layout from '../components/layout/layout'
import Head from 'next/head'
import siteMetadata from '../data/siteMetadata'
import { ThemeProvider } from 'next-themes'
import { motion } from 'framer-motion'
import { Inconsolata, Roboto, Oswald } from '@next/font/google'
import { useEffect, useState } from 'react'

const inconsolata = Inconsolata({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
})

const roboto = Roboto({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
})

const oswald = Oswald({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
})

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export default function App({ Component, pageProps, router }) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>
  } else {

    return (
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta
              name="author"
              content="Maria D. Campbell"
            />
            <link
              rel="icon"
              href="/favicon.ico"
            />
          </Head>
          <motion.div
            key={router.route}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5, type: 'tween' }}
          >
            <main className={`${inconsolata.className}`}>
              <Component {...pageProps} />
            </main>
          </motion.div>
        </Layout>
      </ThemeProvider>
    )
  }
}
