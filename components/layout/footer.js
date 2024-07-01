import { createPortal } from 'react-dom'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Oswald } from 'next/font/google'
import siteMetadata from '../../data/siteMetadata'
import classes from '../../styles/footer.module.scss'

const DynamicSocialIcon = dynamic(() => import('../../helpers/icons-map'))
const DynamicFooterNavigation = dynamic(() => import('./footer-navigation/footer-navigation'))

const oswald = Oswald({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'optional',
  variable: '--oswald-font',
})

function Footer() {

    if (typeof document === "object") {
        return createPortal((
            <footer className={`footer ${classes.footer}`}>
                <h2 className={`${classes.follow} ${oswald.variable}`}>Follow</h2>
                <div className={`${classes['svg-wrapper']}`}>
                    <div className={`footer-email ${classes['footer-email']}`}>
                        <DynamicSocialIcon
                            name="email"
                            href={`mailto:${siteMetadata.email}`}
                            size="6"
                        />
                    </div>
                    <div className={`footer-github ${classes['footer-github']}`}>
                        <DynamicSocialIcon
                            name="github"
                            href={siteMetadata.github}
                            size="6"
                        />
                    </div>
                    <div className={`footer-twitter ${classes['footer-twitter']}`}>
                        <DynamicSocialIcon
                            name="twitter"
                            href={siteMetadata.twitter}
                            size="6"
                        />
                    </div>
                    <div className={`footer-linkedin ${classes['footer-linkedin']}`}>
                        <DynamicSocialIcon
                            name="linkedin"
                            href={siteMetadata.linkedin}
                            size="6"
                        />
                    </div>
                    <div className={`footer-tumblr ${classes['footer-tumblr']}`}>
                        <DynamicSocialIcon
                            name="tumblr"
                            href={siteMetadata.tumblr}
                            size="6"
                        />
                    </div>
                    <div className={`footer-sitemap ${classes['footer-sitemap']}`}>
                        <DynamicSocialIcon
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