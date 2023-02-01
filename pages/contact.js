import { Fragment } from 'react'
import Head from 'next/head'
import ContactForm from '../components/contact/contact-form'

function ContactPage() {
    return (
        <Fragment>
            <Head>
                <title>Contact Maria D. Campbell</title>
                <meta name="description" content="Send Maria D. Campbell your messages" />
            </Head>
            <ContactForm />
        </Fragment>
        
    )
}

export default ContactPage