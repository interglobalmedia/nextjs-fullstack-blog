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
	'github-automated-security-fixes-beta',
	'github-integration-app-smart-commits-on-jira',
	'how-i-upgraded-my-nextjs-13-blog-to-nextjs-14',
	'how-to-remove-an-unwanted-local-repository-in-sourcetree-with-command-line',
	'eslint-parsing-in-react',
	'firefox-0-day-flaw-update',
	'fixing-your-nvm-install',
	'flexbox-sticky-footer-and-react',
	'a-new-react-workflow-with-react-166-and-webpack-4',
	'connecting-to-mongodb-compass-to-access-local-mongodb-databases-via-the-new-mongosh-shell',
	'does-ai-have-ethics',
	'es2018-language-features-available-in-v8js-v64-and-chrome-64',
	'how-to-create-copy-link-with-highlight-links',
	'my-experience-updating-my-nextjs-business-site-to-fix-npm-packages',
	'mastering-javascript',
	'installing-visual-studio-code-text-editor-on-a-mac',
	'im-now-on-patreon',
	'how-to-create-a-sticky-footer-when-you-originally-didnt-account-for-having-one',
	'how-and-why-i-came-to-dropping-off-my-macbook-pro-with-super-computer-doctor-in-murray-hill',
	'how-challenges-road-blocks-and-mistakes-can-lead-to-fruitful-progress-as-a-web-designer-or-developer',
	'guess-the-keys-app',
	'getting-started-with-nextjs',
	'audio-visual-slider',
	'canvas-2d-breakout-game',
	'chattr-public-and-private-realtime-chat',
	'custom-html5-video-player',
	'dragging-bubbles-app',
	'guess-the-keys',
	'making-music-in-the-browser',
	'monsters-api-js-app',
	'monsters-rolodex-react-hooks',
	'omdb-api-js-app',
	'omdb-api-nextjs',
	'poke-api-web-app',
	'reinstalling-homebrew-on-macbook-pro-silicon-2021',
	'rockin-synth',
	'the-cat-whisperer',
	'trump-talks',
	'web-audio-api-ajax',
	'welcome-to-the-groove',
	'wikipedia-viewer',
	'adding-host-property-to-webpack-config',
	'apis-for-developers-and-what-pitfalls-to-watch-out-for',
	'class-conflicts',
	'connecting-your-iphone-hotspot-to-your-macbook-pro-ventura-os',
	'converting-image-formats-on-macos-using-the-finder-app',
	'creating-a-custom-html5-video-player-and-the-shadow-dom',
	'creating-a-shell-script-from-an-applescript-targeting-the-macos-music-app',
	'creating-an-applescript-that-plays-an-album-in-the-macos-music-app',
	'custom-html5-video-player',
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
