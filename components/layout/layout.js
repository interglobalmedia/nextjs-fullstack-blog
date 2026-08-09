import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import VisitCount from '../goatcounter/visit-count'

const DynamicMainNavigation = dynamic(
	() => import('./main-navigation/main-navigation'),
)
const DynamicFooter = dynamic(() => import('./footer'))

function Layout(props) {
	return (
		<Fragment>
			<DynamicMainNavigation />
			<main>{props.children}</main>
			<VisitCount />
			<DynamicFooter />
		</Fragment>
	)
}

export default Layout
