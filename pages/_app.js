import '../styles/globals.scss'
import Layout from '../components/layout/layout'
import Head from 'next/head'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export default function App({ Component, pageProps, router }) {

  return (
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
        <Component {...pageProps} />
      </motion.div>
    </Layout>
  )
}
