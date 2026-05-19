import { Oswald } from 'next/font/google'
import classes from '../../styles/logo.module.scss'

const oswald = Oswald({
	weight: ['400'],
	subsets: ['latin'],
	display: 'optional',
	variable: '--oswald-font',
})

function Logo() {
	return <div className={`${classes.logo} ${oswald.variable}`}>MDC</div>
}

export default Logo
