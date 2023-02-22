import classes from '../styles/about.module.scss'

function AboutPage() {
    return (
        <section className={`about-section ${classes['about-section']}`}>
            <h1>About this Site</h1>
            <article className={`about-article ${classes['about-article']}`}>
                <p className={classes.info}>If you would like to contact me, you can sign in with Github located in the footer of this site and fill out the contact form on the Contact page that appears upon sign in (in progress). Or you can email me directly by clicking on the envelope in the site footer.</p>
                <p className={classes.info}>When you sign in and fill out the contact form, your message will appear in my Guestbook (in progress) along with your Github, Twitter, and Linkedin handle. Looking forward to hearing from you!</p>
            </article>
        </section>
    )
}

export default AboutPage