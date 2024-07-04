import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { document } from 'browser-monads'
import { useRouter } from 'next/router'
import headerNavLinks from '../../../data/header-navlinks'
import { isActiveLink } from '../../../lib/utils/activeLink'
import classes from '../../../styles/main-navigation.module.scss'

const DynamicLogo = dynamic(() => import('../logo'))
const DynamicMoonSunButton = dynamic(() => import('../../buttons/moon-sun-button'))
const DynamicHamButton = dynamic(() => import('../../buttons/ham-button'))

function MainNavigation() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const router = useRouter()

    const toggleMobileNav = () => {
        setMobileNavOpen(!mobileNavOpen)
        const navbar = document.querySelector('.main-nav')
        const ham = document.querySelector('.hamburger')
        if (mobileNavOpen) {
            navbar.classList.add('show-nav')
            ham.classList.add('show-close')
        } else {
            navbar.classList.remove('show-nav')
            ham.classList.remove('show-close')
        }
    }

    function navHighlight() {
        const links = document.querySelectorAll('.menu-link')
        for (let i = 0; i < links.length; i++) {
            if (links[i].href === document.URL) {
                links[i].classList.add('active')
            }
        }
    }

    useEffect(() => {
        navHighlight()
    }, [])

    return (
        <header className={classes.header}>
            <nav className='navbar'>
                <div className={classes['logo-wrapper']}>
                    <Link href='/' className={classes.logo}>
                        <DynamicLogo />
                    </Link>
                </div>
                <ul
                    className='main-nav'>
                    {headerNavLinks.map((link, index) => (
                        <li key={index} className='menu-link-li'>
                            <Link
                                key={link.text}
                                href={link.href}
                                className={`${router.pathname} ===
                    ${link.href} ? 'active' : ''} menu-link relative mr-6 flex flex-col font-medium text-gray-900 dark:text-gray-100 sm:mr-8 sm:p-4`}
                                onClick={toggleMobileNav}
                            >
                                {link.text}
                                {isActiveLink(
                                    link.href,
                                    router.pathname,
                                ) && (
                                        <motion.div
                                            layoutId='navigation-underline'
                                            className='navigation-underline active'
                                            transition={{
                                                duration: 0.5,
                                                type: 'tween',
                                            }}
                                            animate
                                        ></motion.div>
                                    )}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className={`svg-wrapper`}>
                    <DynamicHamButton />
                    <DynamicMoonSunButton />
                </div>
            </nav>
        </header>
    )
}

export default MainNavigation