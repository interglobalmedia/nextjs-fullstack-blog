import { useState, useEffect } from 'react'
import Notification from '../ui/notifications'
import { sendContactData } from '../../helpers/sendContactData'

import classes from '../../styles/contact-form.module.scss'

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredName, setEnteredName] = useState('')
    const [enteredMessage, setEnteredMessage] = useState('')
    /* 'pending', 'success', or 'error', or null or undefined if we don't have any initial request */
    const [requestStatus, setRequestStatus] = useState()
    const [requestError, setRequestError] = useState()

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null)
                setRequestError(null)
            }, 3000)

            return (() => {
                clearTimeout(timer)
            })
        }
    }, [requestStatus])

    async function sendMessageHandler(event) {

        event.preventDefault('')

        /* add client side validation  (optional) */

        setRequestStatus('pending')

        try {
            await sendContactData({
            email: enteredEmail,
            name: enteredName,
            message: enteredMessage
        })

            setRequestStatus('success')
            setEnteredEmail('')
            setEnteredName('')
            setEnteredMessage('')
            
        } catch (error) {
            setRequestError(error.message)
            setRequestStatus('error')
        }
    }

    let notification

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!'
        }
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!'
        }
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            value={enteredEmail}
                            onChange={(event) => setEnteredEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={enteredName}
                            onChange={event => setEnteredName(event.target.value)} />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        type="text"
                        id="message"
                        rows="5"
                        required
                        value={enteredMessage}
                        onChange={event => setEnteredMessage(event.target.value)}></textarea>
                </div>
                <div className={classes.actions}>
                    <button type="submit">Send Message</button>
                </div>
            </form>
            {notification &&
                <Notification status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />}
        </section>
    )
}

export default ContactForm