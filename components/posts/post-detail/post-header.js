import classes from '../../../styles/post-header.module.scss'

function PostHeader(props) {
    const { title } = props
    
    return (
        <header className={`${classes.header} header`}>
            <h1>{title}</h1>
        </header>
    )
}   

export default PostHeader