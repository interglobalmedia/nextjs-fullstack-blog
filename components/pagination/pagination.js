import Link from 'next/link'
import PrevBtn from '../buttons/prev-btn'
import NextBtn from '../buttons/next-btn'
import classes from '../../styles/pagination.module.scss'

export default function Pagination({ totalPages, currentPage }) {
	const prevPage = parseInt(currentPage) - 1 > 0
	const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

	return (
		<div className="space-y-2 pb-8 pt-6 md:space-y-5">
			<nav className={`${classes['pagination']} flex justify-between`}>
				{!prevPage && <PrevBtn />}
				{prevPage && (
					<Link
						href={
							currentPage - 1 === 1
								? `/blog/`
								: `/blog/page/${currentPage - 1}`
						}
					>
						<button rel="previous">Prev</button>
					</Link>
				)}
				<span>
					{currentPage} of {totalPages}
				</span>
				{!nextPage && <NextBtn />}
				{nextPage && (
					<Link href={`/blog/page/${currentPage + 1}`}>
						<button rel="next">Next</button>
					</Link>
				)}
			</nav>
		</div>
	)
}
