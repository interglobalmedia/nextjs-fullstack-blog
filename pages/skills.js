import Link from 'next/link'
import classes from '../styles/skills.module.scss'
import Skills from '../components/skills/skills'

function SkillsPage() {
    return (
        <section className={`skills-section ${classes['skills-section']}`}>
            <h1 className={classes['heading-one']}>Skills</h1>
            <article className={`skills-article ${classes['skills-article']}`}>
                <Skills />
            </article>
        </section>
    )
}

export default SkillsPage