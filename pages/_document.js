import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      
      </Head>
      <body>
        <div className="site-content">
          <Main />
          <NextScript />
          <div id="notifications"></div>
        </div>
        <div id="scroll-step"></div>
        <div id="scroll-top"></div>
        <div id="footer"></div>
      </body>
    </Html>
  )
}
