const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	reactStrictMode: false,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
		silenceDeprecations: ['import'],
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		},
	},
}

module.exports = withBundleAnalyzer(nextConfig)
