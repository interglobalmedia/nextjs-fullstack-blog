const webpack = require('webpack')

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
	function(phase) {
		if (phase === PHASE_DEVELOPMENT_SERVER) {
			return {
				env: {
					mongodb_username: `${MONGODB_USERNAME}`,
					mongodb_password: `${MONGODB_PASSWORD}`,
					mongodb_clusername: `${MONGODB_CLUSTERNAME}`,
					mongodb_database: `${MONGODB_DATABASE_DEV}`
				}
			}
		}
		return {
			env: {
				mongodb_username: `${MONGODB_USERNAME}`,
				mongodb_password: `${MONGODB_PASSWORD}`,
				mongodb_clusername: `${MONGODB_CLUSTERNAME}`,
				mongodb_database: `${MONGODB_DATABASE}`
			}
		}
	},

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
			require("./scripts/generate-sitemap");
		}
		if (!isServer) {
			require("./scripts/compose")
		}

		return config
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	/* Configure pageExtensions to include md and mdx */
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	/* Optionally, add any other Next.js config below */
	reactStrictMode: true,
}

module.exports = withBundleAnalyzer(nextConfig)
