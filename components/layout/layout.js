import { Fragment } from 'react'
import dynamic from 'next/dynamic'

const DynamicMainNavigation = dynamic(() =>
	import('./main-navigation/main-navigation'),
)
const DynamicFooter = dynamic(() => import('./footer'))

function Layout(props) {
	return (
		<Fragment>
			<DynamicMainNavigation />
			<main>{props.children}</main>
			<DynamicFooter />
		</Fragment>
	)
}

export default Layout
