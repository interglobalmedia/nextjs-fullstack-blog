import { useState } from 'react'
import { IoIosCheckmark } from 'react-icons/io'
import {IoCopyOutline} from 'react-icons/io5'
import classes from '../../../styles/code-copy-btn.module.scss'

export default function CodeCopyBtn({ children }) {
    const [isCopyOk, setIsCopyOk] = useState(false)

    const iconColor = isCopyOk ? '#0af20a' : '#ddd'
    
    const handleClick = (e) => {
        navigator.clipboard.writeText(children[0].props.children[0])

        setIsCopyOk(true)
        setTimeout(() => {
            setIsCopyOk(false)
        }, 1000)
    }

    return (
        <button className={classes['code-copy-btn']}>
            {!isCopyOk && <IoCopyOutline onClick={handleClick} style={{ color: iconColor }} />}
            {isCopyOk && <IoIosCheckmark onClick={handleClick} style={{ backgroundColor: iconColor, color: '#000', borderRadius: '1rem' }} />}
        </button>
    )
}