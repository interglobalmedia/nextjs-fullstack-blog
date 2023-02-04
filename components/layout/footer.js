import { createPortal } from 'react-dom'
import Link from 'next/link'
import siteMetadata from '../../data/siteMetadata'
import SocialIcon from '../../helpers/icons-map'
import classes from '../../styles/footer.module.scss'

function Footer() {

    if (typeof document === "object") {
        return createPortal((
            <footer className={`${classes.footer}`}>
                <div className={classes['svg-wrapper']}>
                    <div className={classes.email}>
                        <SocialIcon
                            name="mail"
                            href={`mailto:${siteMetadata.email}`}
                            size="6"
                        />
                    </div>
                    <div className={classes.github}>
                        <SocialIcon
                            name="github"
                            href={siteMetadata.github}
                            size="6"
                        />
                    </div>
                    <div className={classes.twitter}>
                        <SocialIcon
                            name="twitter"
                            href={siteMetadata.twitter}
                            size="6"
                        />
                    </div>
                    <div className={classes.linkedin}>
                        <SocialIcon
                            name="linkedin"
                            href={siteMetadata.linkedin}
                            size="6"
                        />
                    </div>
                    <div className={classes.sitemap}>
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