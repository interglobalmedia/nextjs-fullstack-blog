import NextHead from 'next/head'

export default function Head({ children, title, excerpt, date, author, image, keywords, url }) {
    return (
        <NextHead>
            <meta key="title" name="title" content={title} />
            {excerpt && <meta key="description" name="description" content={excerpt} />}
            {keywords && <meta key="keywords" name="keywords" content={keywords} />}
            <meta key="author" name="author" content={author} />

            {date && (
                <meta
                    key="article:published_time"
                    property="article:published_time"
                    content={new Date(date).toISOString()}
                />
            )}

            <meta key="og:title" property="og:title" content={title} />
            <meta key="og:description" property="og:description" content={excerpt} />
            <meta key="og:type" property="og:type" content="website" />
            {url && <meta key="og:url" property="og:url" content={url} />}

            {image && <meta key="og:image" property="og:image" content={image} />}
            {image && <meta key="image" property="image" content={image} />}
            {image && <meta key="og:image:width" property="og:image:width" content="1200" />}
            {image && <meta key="og:image:height" property="og:image:height" content="630" />}
            <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta key="twitter:creator" name="twitter:creator" content="@letsbsocial1" />
            <meta
                key="twitter:title"
                name="twitter:title"
                content={
                    title ? `${title} | LetsBSocial1 | Maria D. Campbell` : 'Letsbsocial1 | Maria D. Campbell'
                }
            />
            <meta key="twitter:description" name="twitter:description" content={excerpt} />
            {image && <meta key="twitter:image" name="twitter:image" content={image} />}

            {url && <link key="canonical" rel="canonical" href={url} />}

            <title key="pageTitle">
                {title ? `${title} | LetsBSocial1 | Maria D. Campbell` : 'LetsBSocial1 | Maria D. Campbell'}{' '}
            </title>

            {children}
        </NextHead>
    )
}