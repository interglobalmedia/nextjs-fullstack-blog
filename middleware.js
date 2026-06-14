import { NextResponse } from 'next/server'

// Add the slug of any permanently deleted blog post to this array.
// A 410 Gone response tells Google the page is permanently removed,
// which results in faster deindexing than a plain 404.
//
// Format: the slug only, no leading slash, no /blog/ prefix.
// Example: 'my-old-post-title'
//
// Once Google has deindexed the URL (confirm in Google Search Console),
// you can remove the slug from this list.
const DELETED_POST_SLUGS = [
	// 'example-deleted-post',
]

export function middleware(request) {
	const { pathname } = request.nextUrl

	// Only intercept /blog/* routes
	if (pathname.startsWith('/blog/')) {
		const slug = pathname.replace('/blog/', '').replace(/\/$/, '')

		if (DELETED_POST_SLUGS.includes(slug)) {
			return new NextResponse(null, {
				status: 410,
				statusText: 'Gone',
			})
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/blog/:slug*'],
}
