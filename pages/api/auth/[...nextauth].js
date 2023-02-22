import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const github_client_id = process.env.GITHUB_CLIENT_ID
const github_client_secret = process.env.GITHUB_CLIENT_SECRET

const options = {
    providers: [
        GithubProvider({
            clientId: github_client_id,
            clientSecret: github_client_secret
        })
    ]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, options)