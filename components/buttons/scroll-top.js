import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import classes from '../../styles/scroll-buttons.module.scss'

export default function GoTop() {
    const [showGoTop, setShowGoTop] = useState(false)
    const [showMe, setShowMe] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleVisibleButton = () => {
        if (setShowGoTop(window.pageYOffset > 50)) {
            setShowGoTop(true)
            setShowMe(!showMe)
        } else if (setShowGoTop(window.pageYOffset < 50)) {
            setShowGoTop(false)
            setShowMe(showMe)
        }
    }

    const handleScrollUp = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleVisibleButton)
        return () => window.removeEventListener('scroll', handleVisibleButton)
    }, [handleVisibleButton])

    if (typeof document === "object") {
        return createPortal((
            <>
                <button className={`icon-fill ${classes.scroll} ${classes.top} ${classes.icon} ${classes['icon-fill']}`} onClick={handleScrollUp} style={{
                    display: showGoTop ? "none" : "block"
                }}><span className={`material-icons`}>
                        keyboard_arrow_up
                    </span></button>
            </>
        ), document.getElementById('scroll-top'))
    } else {
        return null
    }
}