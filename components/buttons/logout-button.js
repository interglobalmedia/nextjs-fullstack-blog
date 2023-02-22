import { Fragment } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

function LogoutButton() {
    const router = useRouter()
    const { data: session, status } = useSession()

    async function logoutHandler() {
        const data = await signOut({
            redirect: false, callbackUrl: `/auth`
        })
        router.push(data.url)
    }
    return (
        <Fragment>
            {status === `authenticated` &&
                <li>
                    <button onClick={logoutHandler}>Logout</button>
                </li>}
        </Fragment>
    )
}

export default LogoutButton