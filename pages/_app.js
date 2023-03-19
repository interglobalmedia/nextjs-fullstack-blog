import '../styles/globals.scss'
import Layout from '../components/layout/layout'
import Head from 'next/head'
import siteMetadata from '../data/siteMetadata'
import { ThemeProvider } from 'next-themes'
import { motion } from 'framer-motion'
import { Inconsolata, Oswald } from '@next/font/google'
import { useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import PlausibleProvider from 'next-plausible'

const inconsolata = Inconsolata({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'optional',
})

const oswald = Oswald({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'optional',
  variable: '--oswald-font',
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


  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta
              name="author"
              content="Maria D. Campbell"
              key="author"
            />
            <meta
              name="description"
              content="I blog about fullstack development as well as macOS, Command Line, Git, and ethics in technology."
              key="description"
            />
            <link
              rel="icon"
              href="/favicon.ico"
            />
            <style jsx global>{`
        :root {
          --oswald-font: ${oswald.style.fontFamily};
        }
      `}</style>
          </Head>
          <motion.div
            key={router.route}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5, type: 'tween' }}
          >
            <PlausibleProvider domain="mariadcampbell.com">
              <main className={`${inconsolata.className} ${oswald.variable}`}>
                <Component {...pageProps} />
              </main>
            </PlausibleProvider>
          </motion.div>
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  )
}
