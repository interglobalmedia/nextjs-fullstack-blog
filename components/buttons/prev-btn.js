function PrevBtn({ currentPage }) {
	const prevPage = parseInt(currentPage) - 1 > 0
	return (
		<button
			rel="previous"
			className="previous cursor-auto disabled:opacity-50"
			disabled={!prevPage}
		>
			Prev
		</button>
	)
}

export default PrevBtn
