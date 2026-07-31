import { useState } from 'react'
import classes from '../../styles/contact-form.module.scss'

export default function ContactForm() {
	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
		website: '', // honeypot field
	})
	const [status, setStatus] = useState('idle') // idle | sending | sent | error

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setStatus('sending')

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			})

			if (!res.ok) throw new Error('Request failed')

			setStatus('sent')
			setForm({ name: '', email: '', message: '', website: '' })
		} catch (err) {
			console.error('Submit error:', err)
			setStatus('error')
		}
	}

	return (
		<form className={classes['contact-form']} onSubmit={handleSubmit}>
			<label htmlFor="name">Name</label>
			<input
				id="name"
				name="name"
				value={form.name}
				onChange={handleChange}
				required
			/>

			<label htmlFor="email">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				value={form.email}
				onChange={handleChange}
				required
			/>

			<label htmlFor="message">Message</label>
			<textarea
				id="message"
				name="message"
				value={form.message}
				onChange={handleChange}
				required
			/>

			{/* Honeypot field — hidden from real users, catches bots */}
			<input
				type="text"
				name="website"
				value={form.website}
				onChange={handleChange}
				style={{ position: 'absolute', left: '-9999px' }}
				tabIndex="-1"
				autoComplete="off"
				aria-hidden="true"
			/>

			<button type="submit" disabled={status === 'sending'}>
				{status === 'sending' ? 'Sending...' : 'Send'}
			</button>

			{status === 'sent' && (
				<p className={classes.status}>
					Thanks — your message is on its way!
				</p>
			)}
			{status === 'error' && (
				<p className={classes.status}>
					Something went wrong. Please try again.
				</p>
			)}
		</form>
	)
}
