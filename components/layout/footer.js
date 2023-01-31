import Link from 'next/link'
import siteMetadata from '../../data/siteMetadata'

import SocialIcon from '../../helpers/icons-map'

function Footer() {
    return (
        <footer>
            <div className="mt-16 flex flex-col items-center">
                <div className="mb-3 flex flex-wrap justify-evenly space-x-4">
                    <div>
                        <SocialIcon
                            name="mail"
                            href={`mailto:${siteMetadata.email}`}
                            size="6"
                            // className={classes.mail}
                        />
                    </div>
                    <div>
                        <SocialIcon
                            name="github"
                            href={siteMetadata.github}
                            size="6"
                        />
                    </div>
                    <div>
                        <SocialIcon
                            name="twitter"
                            href={siteMetadata.twitter}
                            size="6"
                        />
                    </div>
                    <div>
                        <SocialIcon
                            name="linkedin"
                            href={siteMetadata.linkedin}
                            size="6"
                        />
                    </div>
                </div>
            </div>
            <p>

                {`© ${new Date().getFullYear()}`} {` • `}{' '}
                {siteMetadata.author}{' '} {` • `}
                <Link href="/">{siteMetadata.title}</Link>
            </p>
        </footer>
    )
}

export default Footer