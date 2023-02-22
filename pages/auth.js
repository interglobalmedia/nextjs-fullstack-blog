import { getSession } from 'next-auth/react'

function AuthPage() {
    return (
        <div>
            <h1>The auth page</h1>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = getSession({ req: context.req })
    
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            session
        }
    }

}

export default AuthPage