import { Fragment } from 'react'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const DynamicContactForm = dynamic(() => import('../components/contact/contact-form'))

function ContactPage() {
    return (
        <Fragment>
            <Head>
                <title>Contact Maria D. Campbell</title>
                <meta name="description" content="Send Maria D. Campbell your messages" />
            </Head>
            <DynamicContactForm />
        </Fragment>
        
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req})
    if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

export default ContactPage