import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="site">
        <div className="site-content-wrapper">
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
