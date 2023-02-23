import Link from 'next/link'
import classes from '../styles/about.module.scss'

function AboutPage() {
    return (
        <section className={`about-section ${classes['about-section']}`}>
            <h1>About this Site</h1>
            <article className={`about-article ${classes['about-article']}`}>
                <p className={classes.info}>If you would like to contact me, you can sign in with Github located in the footer of this site and fill out the <Link href='/contact'>contact form</Link> on the <Link href='/contact'>Contact page</Link> that appears upon sign in. Or you can email me directly by clicking on the envelope in the site footer.</p>
                <p className={classes.info}>When you sign in and fill out the contact form, your message will appear in my <Link href='/guestbook'>Guestbook</Link> along with links to your Github, Twitter, and Linkedin handles. Looking forward to hearing from you!</p>
                <p className={classes.info}>Spam will be removed.</p>
            </article>
        </section>
    )
}

export default AboutPage