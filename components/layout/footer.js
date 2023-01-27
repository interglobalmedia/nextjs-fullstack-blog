import classes from  '../../styles/footer.module.scss'

function Footer() {
    const theDate = new Date()
    return (
        <footer className={classes.footer}>
            <p>{`© ${theDate.getFullYear()} Maria D. Campbell`}</p>
        </footer>
 )
}

export default Footer