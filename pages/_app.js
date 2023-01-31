import '../styles/globals.scss'
import Layout from '../components/layout/layout'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  
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
        <Component {...pageProps} />
    </Layout>
  )
}
