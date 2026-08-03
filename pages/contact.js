import Head from '../components/seo/head'
import siteMetadata from '../data/siteMetadata'
import GlyphBackground from '../components/shared/glyph-background'
import { generateContactGlyph } from '../components/contact/contact-glyph-content'
import ContactForm from '../components/contact-form/contact-form'
import bgClasses from '../styles/glyph-background.module.scss'
import classes from '../styles/contact.module.scss'

const DEFAULT_IMAGE = `${siteMetadata.siteUrl}${siteMetadata.defaultImage}`

export default function Contact() {
	const url = `${siteMetadata.siteUrl}/contact`

	return (
		<div className={bgClasses['page-wrapper']}>
			<Head
				title="Contact"
				excerpt="Get in touch with Maria D. Campbell — available for remote-first work and open to speaking and presenting opportunities."
				url={url}
				author={siteMetadata.author}
				image={DEFAULT_IMAGE}
				imageAlt="Contact Maria D. Campbell"
				keywords="contact, get in touch, hire, remote work, speaking, freelance, consulting"
				type="website"
			/>
			<GlyphBackground generateContent={generateContactGlyph} />
			<section className={classes['contact-section']}>
				<h1>Get in Touch</h1>
				<ContactForm />
			</section>
		</div>
	)
}
