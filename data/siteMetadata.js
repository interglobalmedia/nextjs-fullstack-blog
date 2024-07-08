const siteMetadata = {
	siteUrl: 'https://www.mariadcampbell.com',
	siteName: `Maria D. Campbell`,
	domain: 'mariadcampbell.com',
	sitemap: '/sitemap.xml',
	locale: 'en-US',
	language: 'en-us',
	theme: 'system', // system, dark or light
	title: `Maria's Next Blog`,
	author: 'Maria D. Campbell',
	email: 'interglobalmedia@gmail.com',
	github: 'https://github.com/interglobalmedia',
	twitter: 'https://twitter.com/letsbsocial1',
	linkedin: 'https://www.linkedin.com/in/mariacampbell/',
	reddit: `https://www.reddit.com/interglobalmedia1`,
	tumblr: `https://www.tumblr.com/interglobalmedia`,
	redditHandle: `interglobalmedia1`,
	twitterHandle: `letsbsocial1`,
	combinatorHandle: `mariador62`,
	linkedinHandle: `mariacampbell`,
	tumblrHandle: `åletsbcultures`,
	comment: {
		// If you want to use a commenting system other than giscus you have to add it to the
		// content security policy in the `next.config.js` file.
		// Select a provider and use the environment variables associated to it
		// https://vercel.com/docs/environment-variables
		provider: 'giscus', // supported providers: giscus, utterances, disqus
		giscusConfig: {
			// Visit the link below, and follow the steps in the 'configuration' section
			// https://giscus.app/
			repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
			repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
			category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
			categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
			mapping: 'pathname', // supported options: pathname, url, title
			reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
			// Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
			metadata: '0',
			// theme example: light, dark, dark_dimmed, dark_high_contrast
			// transparent_dark, preferred_color_scheme, custom
			theme: 'preferred_color_scheme',
			// Place the comment box above the comments. options: bottom, top
			inputPosition: 'top',
			// Choose the language giscus will be displayed in. options: en, es, zh-CN, zh-TW, ko, ja etc
			lang: 'en',
			// theme when dark mode
			darkTheme: 'transparent_dark',
			// If the theme option above is set to 'custom`
			// please provide a link below to your custom theme css file.
			// example: https://giscus.app/themes/custom_example.css
			themeURL: '',
		},
		utterancesConfig: {
			// Visit the link below, and follow the steps in the 'configuration' section
			// https://utteranc.es/
			repo: '',
			issueTerm: '', // supported options: pathname, url, title
			label: '', // label (optional): Comment 💬
			// theme example: github-light, github-dark, preferred-color-scheme
			// github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
			theme: '',
			// theme when dark mode
			darkTheme: '',
		},
	},
}

module.exports = siteMetadata
