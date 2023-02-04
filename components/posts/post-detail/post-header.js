import Image from "next/legacy/image";
import classes from '../../../styles/post-header.module.scss'
function PostHeader(props) {
    const { title, image } = props
    
    return (
        <header className={`${classes.header} header`}>
            <h1>{title}</h1>
            <Image src={image} alt={title} width={200} height={150} />

        </header>
    )
}   

export default PostHeader