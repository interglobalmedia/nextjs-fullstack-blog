import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import classes from '../../styles/scroll-buttons.module.scss'

export default function ScrollStep() {
    const [showScrollStep, setShowScrollStep] = useState(false)
    const [showMe, setShowMe] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleVisibleButton = () => {
        if (setShowScrollStep(window.pageYOffset > 50)) {
            setShowScrollStep(true)
            setShowMe(!showMe)
        } else if (setShowScrollStep(window.pageYOffset <= 50)) {
            setShowScrollStep(false)
            setShowMe(showMe)
        }
    }

    const handleStepButton = () => {
        window.scroll(0, window.pageYOffset + 200)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleVisibleButton)
        return () => {
            window.removeEventListener('scroll', handleVisibleButton)
        }
    }, [handleVisibleButton, showMe])

    if (typeof document === "object") {
        return createPortal((
            <button className={`icon-fill ${classes.scroll} ${classes.bottom} ${classes.icon} ${classes['icon-fill']}`} onClick={handleStepButton} style={{
                    display: showScrollStep ? "none" : "block"
                }}><span className="material-icons">
                keyboard_arrow_down
            </span></button>
        ), document.getElementById('scroll-step'))
    } else {
        return null
    }
}