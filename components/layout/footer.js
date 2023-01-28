function Footer() {
    const theDate = new Date()
    return (
        <footer>
            <p>{`© ${theDate.getFullYear()} Maria D. Campbell`}</p>
        </footer>
 )
}

export default Footer