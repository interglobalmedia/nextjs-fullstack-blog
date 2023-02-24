import { connectToDB } from '../lib/db'
import { useSession, getSession } from 'next-auth/react'
import classes from '../styles/guestbook.module.scss'
function GuestBook({ messages }) {
    const twitterUrl = `https://twitter.com/`
    const linkedinUrl = `https://www.linkedin.com/in/`
    const githubUrl = `https://github.com/`
    return (
        <>
            <section className={`guestbook-section ${classes['guestbook-section']}`}>
                <h1>Guests</h1>
                <ul className={classes['guestbook-list']}>
                    {messages.map((message) => (
                        // eslint-disable-next-line react/jsx-key
                        <li className={`guest ${classes.guest}`}>
                            
                            <ul className={classes['message-name']}>
                                <li>Name:</li>
                                <li><b>{message.name}</b></li>
                            </ul>
                            <ul className={classes['message-twitter']}>
                                <li>Twitter Handle: </li>
                                <li><b><a className={`social-guest-link ${classes['social-guest-link']}`} href={`${twitterUrl}${message.twitterHandle}`} target="_blank" rel="noopener noreferrer">{message.twitterHandle}</a></b></li>
                            </ul>
                            <ul className={classes['message-linkedin']}>
                                <li>Linkedin Handle:</li> <li><b><a className={`social-guest-link ${classes['social-guest-link']}`} href={`${linkedinUrl}${message.linkedinHandle}`}>{message.linkedinHandle}</a></b></li>
                            </ul>
                            <ul className={classes['message-github']}>
                                <li>Github Handle:</li>
                                <li><b><a className={`social-guest-link ${classes['social-guest-link']}`} href={`${githubUrl}${message.githubHandle}`}>{message.githubHandle}</a></b></li>
                            </ul>
                            <ul className={classes['message-message']}>
                                <li><b>Message:</b></li>
                                <li>{message.message}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        }
    }
    let messages = []
    const client = await connectToDB()
    const db = client.db()
    const messagesCollection = db.collection('messages')
    const result = await messagesCollection.find({}).toArray()
    // const parsedMessages = JSON.parse(JSON.stringify(result))
    client.close()
    messages = result.map((message) => {
        message.name,
        message.twitterHandle,
        message.linkedinHandle,
        message.githubHandle
    })
    return {
        props: {
            messages: parsedMessages,
            session
        }
    }
}
export default GuestBook