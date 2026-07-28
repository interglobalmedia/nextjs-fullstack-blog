import { defineConfig } from 'vitest/config'
import { transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const transformJsxInJs = () => ({
	name: 'transform-jsx-in-js',
	enforce: 'pre',
	async transform(code, id) {
		if (!id.match(/.*\.js$/) || id.includes('node_modules')) return null
		return await transformWithOxc(code, id, { lang: 'jsx' })
	},
})

export default defineConfig({
	plugins: [transformJsxInJs(), react({ include: /\.(js|jsx|ts|tsx)$/ })],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./vitest.setup.js'],
		include: ['__tests__/**/*.test.{js,jsx,ts,tsx}'],
		css: {
			include: [/\.module\.(css|scss|sass)$/],
			modules: {
				classNameStrategy: 'non-scoped',
			},
		},
		coverage: {
			provider: 'v8',
			reportsDirectory: 'coverage',
		},
	},
	resolve: {
		alias: {
			'react-markdown': path.resolve(
				__dirname,
				'__mocks__/empty-mock.js',
			),
			'next/font/google': path.resolve(
				__dirname,
				'__mocks__/next-font-mock.js',
			),
		},
	},
})
