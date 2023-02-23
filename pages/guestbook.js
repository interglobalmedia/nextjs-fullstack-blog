import { connectToDB } from '../lib/db'
import { useSession } from 'next-auth/react'
import classes from '../styles/guestbook.module.scss'
function GuestBook({ messages }) {
    const { data: session, status } = useSession()
    // const loading = status === "loading"
    return (
        <>
            <section classname={classes['guestbook-section']}>
                <h1>Guestbook</h1>
                <ul className={classes['guestbook-list']}>
                    {messages.map((message) => (
                        <li key={message._id}>
                            {message.name}
                            {console.log(`the user name`, message.name)}
                        </li>
                    ))}
                </ul>
            </section>
            <section className={classes.user}>
                {
                    status === `authtenticated` &&
                    <>
                        <p style={{ marginBottom: '10px' }}> Welcome, {data.session.user.name && datga.session.user.email}</p> <br />
                    </>
                }
            </section>
        </>
    )
}

export async function getServerSideProps() {
    let messages = []
    const client = await connectToDB()
    const db = client.db()
    const messagesCollection = db.collection('messages')
    console.log(messagesCollection)
    const result = await messagesCollection.find({}).toArray()
    console.log(`the result`, result)
    const parsedMessages = JSON.parse(JSON.stringify(result))
    console.log(`the parsed messages`, parsedMessages)
    client.close()
    messages = parsedMessages.map((message) => {
        message.name,
            message.twitterHandle,
            message.linkedinHandle,
            message.githubHandle
    })
    return {
        props: {
            messages: parsedMessages
        }
    }
}
export default GuestBook