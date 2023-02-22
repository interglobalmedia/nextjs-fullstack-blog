import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import siteMetadata from '../../data/siteMetadata'
import SocialIcon from '../../helpers/icons-map'
import ProviderButtons from '../buttons/provider-buttons'
import FooterNavigation from './footer-navigation/footer-navigation'
import classes from '../../styles/footer.module.scss'

function Footer() {
    const { data: session, status } = useSession()


    if (typeof document === "object") {
        return createPortal((
            <footer className={`footer ${classes.footer}`}>
                <FooterNavigation />
                <div className={classes['provider-wrapper']}>
                    {status === `unauthenticated` && <h2 className={classes['sign-in']}>Sign in</h2>}
                    {status === `authenticated` && <h2 className={classes['sign-in']}></h2>}
                    <ProviderButtons />
                </div>
                <h2 className={classes.follow}>Follow</h2>
                <div className={`${classes['svg-wrapper']}`}>
                    <div className={`footer-email ${classes['footer-email']}`}>
                        <SocialIcon
                            name="email"
                            href={`mailto:${siteMetadata.email}`}
                            size="6"
                        />
                    </div>
                    <div className={`footer-github ${classes['footer-github']}`}>
                        <SocialIcon
                            name="github"
                            href={siteMetadata.github}
                            size="6"
                        />
                    </div>
                    <div className={`footer-twitter ${classes['footer-twitter']}`}>
                        <SocialIcon
                            name="twitter"
                            href={siteMetadata.twitter}
                            size="6"
                        />
                    </div>
                    <div className={`footer-linkedin ${classes['footer-linkedin']}`}>
                        <SocialIcon
                            name="linkedin"
                            href={siteMetadata.linkedin}
                            size="6"
                        />
                    </div>
                    <div className={`footer-sitemap ${classes['footer-sitemap']}`}>
                        <SocialIcon
                            name="sitemap"
                            href={siteMetadata.sitemap}
                            size="6"
                        />
                    </div>
                </div>
                <p>
                    {`© ${new Date().getFullYear()}`} {` • `}{' '}
                    {siteMetadata.author}{' '} {` • `}
                    <Link href="/">{siteMetadata.title}</Link>
                </p>
            </footer>
        ), document.getElementById('footer'))
    } else {
        return null
    }
}

export default Footer