import Link from 'next/link'
import { Fragment } from 'react'
import { useSession } from 'next-auth/react'

function GithubButton() {
    const { data: session, status } = useSession()
    return (
        <Fragment>
            {status === `unauthenticated` &&
                <li>
                    <Link href='/api/auth/signin'>Github</Link>
                </li>}
        </Fragment>
    )
}

export default GithubButton