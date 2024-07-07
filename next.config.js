const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',

	webpack: (config, { dev, isServer }) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})

		if (!dev && !isServer) {
			// Replace React with Preact only in client production build
			Object.assign(config.resolve.alias, {
				'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat',
			})
		}

		if (isServer) {
			require('./scripts/generate-sitemap')
		}
		if (!isServer) {
			require('./scripts/compose')
		}

		config.plugins.push(
			new webpack.EnvironmentPlugin(
				'NEXT_PUBLIC_GISCUS_REPO',
				'NEXT_PUBLIC_GISCUS_REPOSITORY_ID',
				'NEXT_PUBLIC_GISCUS_CATEGORY',
				'NEXT_PUBLIC_GISCUS_CATEGORY_ID',
				'NEXT_PUBLIC_PLAUSIBLE_API_KEY',
			),
		)

		return config
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	/* Configure pageExtensions to include md and mdx */
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	/* Optionally, add any other Next.js config below */
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
}

module.exports = withBundleAnalyzer(nextConfig)
