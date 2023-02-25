import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { sendContactData } from '../../helpers/send-contact-data'

import classes from '../../styles/contact-form.module.scss'

const DynamicNotification = dynamic(() => import('../ui/notifications'))

function ContactForm() {
    const [enteredName, setEnteredName] = useState('')
    const [enteredTwitterHandle, setEnteredTwitterHandle] = useState('')
    const [enteredLinkedinHandle, setEnteredLinkedinHandle] = useState('')
    const [enteredGithubHandle, setEnteredGithubHandle] = useState('')
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
                name: enteredName,
                twitterHandle: enteredTwitterHandle,
                linkedinHandle: enteredLinkedinHandle,
                githubHandle: enteredGithubHandle,
                message: enteredMessage
            })

            setRequestStatus('success')
            setEnteredName('')
            setEnteredTwitterHandle('')
                setEnteredLinkedinHandle('')
                setEnteredGithubHandle('')
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
        <section className={`contact ${classes.contact} ${oswald.variable}`}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label className={`label`} htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={enteredName}
                            onChange={event => setEnteredName(event.target.value)} />
                    </div>
                    <div className={classes.control}>
                        <label className={`label`} htmlFor="twitter-handle">Your TwitterHandle</label>
                        <input
                            type="text"
                            id="twitter-handle"
                            required
                            value={enteredTwitterHandle}
                            onChange={event => setEnteredTwitterHandle(event.target.value)} />
                    </div>
                    <div className={classes.control}>
                        <label className={`label`} htmlFor="linkedin-handle">Your Linkedin Handle</label>
                        <input
                            type="text"
                            id="linkedin-handle"
                            required
                            value={enteredLinkedinHandle}
                            onChange={event => setEnteredLinkedinHandle(event.target.value)} />
                    </div>
                    <div className={classes.control}>
                        <label className={`label`} htmlFor="github-handle">Your Github Handle</label>
                        <input
                            type="text"
                            id="github-handle"
                            required
                            value={enteredGithubHandle}
                            onChange={event => setEnteredGithubHandle(event.target.value)} />
                    </div>
                </div>
                <div className={classes.control}>
                    <label className={`label`} htmlFor="message">Your Message</label>
                    <textarea
                        type="text"
                        id="message"
                        rows="5"
                        required
                        value={enteredMessage}
                        onChange={event => setEnteredMessage(event.target.value)}></textarea>
                </div>
                <div className={classes.actions}>
                    <button className={`contact-btn-submit`} type="submit">Send Message</button>
                </div>
            </form>
            {notification &&
                <DynamicNotification status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />}
        </section>
    )
}

export default ContactForm