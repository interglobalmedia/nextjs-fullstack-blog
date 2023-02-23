import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const options = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            nextAuthSecret: process.env. NEXTAUTH_SECRET
        })
    ]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, options)