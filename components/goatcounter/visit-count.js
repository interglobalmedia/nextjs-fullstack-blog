import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import classes from '../../styles/visit-count.module.scss'

export default function VisitCount() {
	const [count, setCount] = useState(undefined)
	const router = useRouter()

	useEffect(() => {
		const path = encodeURIComponent(router.asPath)

		fetch(`https://interglobalmedia.goatcounter.com/counter/${path}.json`)
			.then((res) => res.json())
			.then((data) => setCount(data.count))
			.catch(() => setCount(null))
	}, [router.asPath])

	if (count === null) return null

	return (
		<p className={classes['visit-count']}>
			{count === undefined ? 'loading' : `${count} views`}
		</p>
	)
}
