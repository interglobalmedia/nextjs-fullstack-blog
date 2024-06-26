import Link from 'next/link'
import classes from '../styles/about.module.scss'

function AboutPage() {
    return (
        <section className={`about-section ${classes['about-section']}`}>
            <h1>About this Site</h1>
            <article className={`about-article ${classes['about-article']}`}>
                <p className={classes.info}>If you would like to contact me, you can email me by clicking on the envelope in the site footer.</p>
                <p className={classes.info}>Looking forward to hearing from you!</p>
                <p className={classes.info}>Spam will be automatically blocked and deleted.</p>
                <p className={classes.info}>Available for new work opportunities. And be sure to check out my Skills page to learn more about what I have to offer.</p>
            </article>
        </section>
    )
}

export default AboutPage