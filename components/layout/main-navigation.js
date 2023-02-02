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
                        <li key={index}><Link href={link.href}>{link.title}</Link></li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation