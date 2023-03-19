import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import siteMetadata from '../../data/siteMetadata'


export const config = {
    runtime: 'edge',
};

export default function handler(req = NextRequest) {
    const { searchParams } = new URL(req.url);
    // ?title=<title>
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    }
    const base_url = process.env.NEXT_PUBLIC_BASE_URL
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const host = process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'www.mariadcampbell.com'
    const image = `/images/site/drew-farwell-6pQiSb5qnEo-unsplash.jpg`
    const ogImage = `${base_url}${image}`
    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'No Title'
    const hasAuthor = searchParams.has('author')
    const author = hasAuthor ? searchParams.get('author').slice(0, 200) : 'Maria D. Campbell'
    const date = new Date(searchParams.get('date') || Date.now())


    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    backgroundColor: 'black',
                    backgroundSize: '150px 150px',
                    // height: '100%',
                    height: 800,
                    width: '100%',
                    maxWidth: 1200,
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    // overFlowX: 'hidden'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        justifyItems: 'center',
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img
                        alt="Woman surfing waves in the ocean"
                        height={232}
                        src={ogImage}
                        style={{ margin: '0 30px', borderRadius: '50%' }}
                        width={232}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        fontSize: 48,
                        fontStyle: 'normal',
                        letterSpacing: '-0.025em',
                        color: 'white',
                        marginTop: 30,
                        padding: '0 120px',
                        lineHeight: 1.4,
                        whiteSpace: 'pre-wrap',
                    }}
                >{title}</div>
                <div
                    style={{
                        display: 'flex',
                        fontSize: 30,
                        fontStyle: 'normal',
                        letterSpacing: '-0.025em',
                        color: 'white',
                        marginTop: 30,
                        padding: '0 120px',
                        lineHeight: 1.4,
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {author +
                        ' – ' +
                        date.toLocaleDateString('en-US', options)}
                </div>
            </div>
        ),
        {
            width: '100%',
            height: '100%',
        },
    )
}