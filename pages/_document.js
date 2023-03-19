import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
        <meta name="twitter:author" content={`letsbsocial1`} />
        <meta name="twitter:site" content={`letsbsocial1`} />
        <meta name="twitter:card" content="summary_large_image" />
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
