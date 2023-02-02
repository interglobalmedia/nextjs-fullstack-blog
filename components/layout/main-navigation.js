import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from './logo'
import headerNavLinks from '../../data/header-navlinks'
import classes from '../../styles/main-navigation.module.scss'

function MainNavigation() {
    const router = useRouter()
    return (
        <header className={classes.header}>
            <Link href='/'>
                <Logo />
            </Link>
            <nav>
                <ul>
                    {headerNavLinks.map((link, index) => (
                        <li key={index} className={classes["menu-link"]}><Link href={link.href}>{link.title}</Link></li>
                    ))}
                </ul>
                <div className={classes["svg-wrapper"]}>
                    <button className={classes.hamburger} aria-label="Right Align">
                        <svg
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                            // onClick={toggleMobileNav}
                        >
                            <path
                                className={classes.line + ' ' + classes.top}
                                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                            />
                            <path className={classes.line + ' ' + classes.middle} d="M 20,50 H 80" />
                            <path
                                className={classes.line + ' ' + classes.bottom}
                                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                            />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default MainNavigation