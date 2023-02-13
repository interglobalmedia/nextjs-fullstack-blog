const webpack = require('webpack')

const dotenv = require('dotenv')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		/* If you use remark-gfm, you'll need to use next.config.mjs as the package is ESM only https://github.com/remarkjs/remark-gfm#install */
		remarkPlugins: [],
		rehypePlugins: [],
		/* If you use `MDXProvider`, uncomment the following line. */
		providerImportSource: "@mdx-js/react",
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
			require("./scripts/sitemap-generator");
		}
		if (!isServer) {
			require("./scripts/compose")
		}

		return config
	},

	constants: (phase) => {
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
	}
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	/* Configure pageExtensions to include md and mdx */
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	/* Optionally, add any other Next.js config below */
	reactStrictMode: true,
}

/* Merge MDX config with Next.js config */
module.exports = withMDX(nextConfig)
