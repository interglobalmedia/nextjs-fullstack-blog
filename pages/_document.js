import { Html, Head, Main, NextScript } from 'next/document'
import Footer from '../components/layout/footer'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="site-content">
          <Main />
          <NextScript />
        </div>
        <Footer />
      </body>
    </Html>
  )
}
