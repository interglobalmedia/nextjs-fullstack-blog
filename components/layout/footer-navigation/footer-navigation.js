import { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { isActiveLink } from '../../../lib/utils/activeLink'
import classes from '../../../styles/footer-navigation.module.scss'

function FooterNavigation() {
    const router = useRouter()
    const { data: session, status } = useSession()

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
        <header className={`footer-header ${classes['footer-header']}`}>
            <nav className={classes['footer-navbar']}>
                <ul className={`footer-nav ${classes['footer-nav']}`}>
                    {status === `authenticated` &&
                        <li className='menu-link-li'>
                            <Link href='/contact' className={`${router.pathname} ===
                    '/contact' ? 'active' : ''} menu-link relative mr-6 flex flex-col font-medium text-gray-900 dark:text-gray-100 sm:mr-8 sm:p-4`}>Contact{isActiveLink(
                                `/contact`,
                                router.pathname,
                            ) && (
                                        <motion.div
                                            layoutId="navigation-underline"
                                            className="navigation-underline active"
                                            transition={{
                                                duration: 0.5,
                                                type: 'tween',
                                            }}
                                            animate
                                        ></motion.div>
                                    )}</Link>
                        </li>}
                    {status === `authenticated` &&
                        <li className='menu-link-li'>
                            <Link href='/guestbook' className={`${router.pathname} ===
                    '/guestbook' ? 'active' : ''} menu-link relative mr-6 flex flex-col font-medium text-gray-900 dark:text-gray-100 sm:mr-8 sm:p-4`}>Guestbook{isActiveLink(
                                `/guestbook`,
                                router.pathname,
                            ) && (
                                        <motion.div
                                            layoutId="navigation-underline"
                                            className="navigation-underline active"
                                            transition={{
                                                duration: 0.5,
                                                type: 'tween',
                                            }}
                                            animate
                                        ></motion.div>
                                    )}</Link>
                        </li>}
                </ul>
            </nav>
        </header>
    )

}

export default FooterNavigation