import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { isActiveLink } from '../../../lib/utils/activeLink'
import classes from '../../../styles/footer-navigation.module.scss'

function FooterNavigation() {
	const router = useRouter()

	function navHighlight() {
		const links = document.querySelectorAll('.footer-menu-link')
		for (let i = 0; i < links.length; i++) {
			if (links[i].href === document.URL) {
				links[i].classList.add('footer-active')
			}
		}
	}

	useEffect(() => {
		navHighlight()
	}, [])

	return (
		<header className={`footer-header ${classes['footer-header']}`}>
			<nav className={classes['footer-navbar']}>
				<ul
					className={`footer-nav footer-navigation-underline ${classes['footer-nav']} ${classes['footer-navigation-underline']}`}
				>
					<li className="footer-menu-link-li">
						<Link
							href="/about"
							className={`${
								router.pathname === '/about'
									? 'footer-active'
									: ''
							} footer-menu-link relative mr-6 flex flex-col font-medium sm:mr-8`}
						>
							About
							{isActiveLink(`/about`, router.pathname) && (
								<motion.div
									layoutId="footer-navigation-underline"
									className="footer-navigation-underline footer-active"
									transition={{
										duration: 0.5,
										type: 'tween',
									}}
									animate
								></motion.div>
							)}
						</Link>
					</li>
					<li className="footer-menu-link-li">
						<Link
							href="/resume"
							className={`${
								router.pathname === '/resume'
									? 'footer-active'
									: ''
							} footer-menu-link relative mr-6 flex flex-col font-medium sm:mr-8`}
						>
							Resume
							{isActiveLink(`/resume`, router.pathname) && (
								<motion.div
									layoutId="footer-navigation-underline"
									className="footer-navigation-underline footer-active"
									transition={{
										duration: 0.5,
										type: 'tween',
									}}
									animate
								></motion.div>
							)}
						</Link>
					</li>
					<li className="footer-menu-link-li">
						<Link
							href="/contact"
							className={`${
								router.pathname === '/contact'
									? 'footer-active'
									: ''
							} footer-menu-link relative mr-6 flex flex-col font-medium sm:mr-8`}
						>
							Contact
							{isActiveLink(`/contact`, router.pathname) && (
								<motion.div
									layoutId="footer-navigation-underline"
									className="footer-navigation-underline footer-active"
									transition={{
										duration: 0.5,
										type: 'tween',
									}}
									animate
								></motion.div>
							)}
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default FooterNavigation
