import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="twitter:author" content="@letsbsocial1" />
        <meta name="twitter:site" content="@letsbsocial1" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://twitter.com/letsbsocial1`} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/ images/site/drew-farwell-6pQiSb5qnEo-unsplash.jpg`} />
        <meta property="og:title" content={`Maria D. Campbell`} />
        <meta property="og:url" content={`https://www.mariadcampbell.com`} />
        <meta property="og:type" content="website" />
       
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
