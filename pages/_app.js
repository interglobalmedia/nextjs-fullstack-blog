import '../styles/globals.scss'
import Layout from '../components/layout/layout'
import Head from 'next/head'
import ThemeProvider from '../components/context/theme-provider'
import { motion } from 'framer-motion'
import { Inconsolata, Oswald } from 'next/font/google'
import Script from 'next/script'
import { useEffect } from 'react'

const inconsolata = Inconsolata({
	weight: ['300', '400', '700'],
	subsets: ['latin'],
	display: 'optional',
})

const oswald = Oswald({
	weight: ['300', '400', '700'],
	subsets: ['latin'],
	display: 'optional',
	variable: '--oswald-font',
})

const variants = {
	hidden: { opacity: 0, x: -200, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: -100 },
}

export default function App({ Component, pageProps, router }) {
	useEffect(() => {
		const handleRouteChange = (url) => {
			if (window.goatcounter?.count) {
				window.goatcounter.count({ path: url })
			}
		}
		router.events.on('routeChangeComplete', handleRouteChange)
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])
	return (
		<ThemeProvider>
			<Layout>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link rel="icon" href="/favicon.ico" />
					{}
					<style jsx global>{`
						:root {
							--oswald-font: ${oswald.style.fontFamily};
						}
					`}</style>
				</Head>
				<motion.div
					key={router.route}
					initial="hidden"
					animate="enter"
					exit="exit"
					variants={variants}
					transition={{ duration: 0.5, type: 'tween' }}
				>
					<Script
						data-goatcounter="https://interglobalmedia.goatcounter.com/count"
						src="//gc.zgo.at/count.js"
						strategy="afterInteractive"
					/>
					<main
						className={`${inconsolata.className} ${oswald.variable}`}
					>
						<Component {...pageProps} />
					</main>
				</motion.div>
			</Layout>
		</ThemeProvider>
	)
}
