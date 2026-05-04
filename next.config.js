const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		},

		// resolveAlias: {
		//     'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
		//     react: 'preact/compat',
		//     'react-dom/test-utils': 'preact/test-utils',
		//     'react-dom': 'preact/compat',
		// },
	},
}

module.exports = withBundleAnalyzer(nextConfig)
