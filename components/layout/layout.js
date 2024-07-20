import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import GoogleAnalytics from '../analytics/google-analytics'

const DynamicMainNavigation = dynamic(() =>
	import('./main-navigation/main-navigation'),
)
const DynamicFooter = dynamic(() => import('./footer'))

function Layout(props) {
	return (
		<Fragment>
			<GoogleAnalytics />
			<DynamicMainNavigation />
			<main>{props.children}</main>
			<DynamicFooter />
		</Fragment>
	)
}

export default Layout
