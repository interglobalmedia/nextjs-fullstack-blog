function NextBtn({ totalPages, currentPage }) {
	const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)
	return (
		<button
			rel="next"
			className="next cursor-auto disabled:opacity-50"
			disabled={!nextPage}
		>
			Next
		</button>
	)
}

export default NextBtn
