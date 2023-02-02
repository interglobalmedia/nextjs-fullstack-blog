const webpack = require('webpack')

const dotenv = require('dotenv')

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

		config.plugins.push(
			new webpack.EnvironmentPlugin(
				'NEXT_PUBLIC_MONGODB_URL',
			),
		)

		return config
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
