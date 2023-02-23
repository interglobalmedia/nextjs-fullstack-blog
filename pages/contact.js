import { Fragment } from 'react'
import { useSession, getSession } from 'next-auth/react'
import Head from 'next/head'
import ContactForm from '../components/contact/contact-form'

function ContactPage() {
    const { data: session } = useSession()
    return (
        <Fragment>
            <Head>
                <title>Contact Maria D. Campbell</title>
                <meta name="description" content="Send Maria D. Campbell your messages" />
            </Head>
            <ContactForm />
            <section className={classes['guestbook-section']}>
                {
                    session &&
                    <>
                        <p style={{ marginBottom: '10px' }}> Welcome, {session.user.name ?? session.user.email}</p> <br />
                    </>
                }
            </section>
        </Fragment>
        
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

    return {
        props: {
            session
        }
    }
}

export default ContactPage