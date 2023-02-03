import Link from 'next/link'

const NavItem = ({ href, text }) => {
    <Link href={href} className={`menu-link`}>
        {text}
    </Link>
}

export default NavItem