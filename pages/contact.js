import GlyphBackground from '../components/shared/glyph-background'
import { generateContactGlyph } from '../components/contact/contact-glyph-content'
import ContactForm from '../components/contact-form/contact-form'
import bgClasses from '../styles/glyph-background.module.scss'
import classes from '../styles/contact.module.scss'

export default function Contact() {
	return (
		<div className={bgClasses['page-wrapper']}>
			<GlyphBackground generateContent={generateContactGlyph} />
			<section className={classes['contact-section']}>
				<h1>Get in Touch</h1>
				<ContactForm />
			</section>
		</div>
	)
}
