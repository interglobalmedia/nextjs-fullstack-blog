import { transporter } from '../../lib/nodemailer'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	const { name, email, message } = req.body

	if (!name || !email || !message) {
		return res.status(400).json({ message: 'Missing required fields' })
	}

	try {
		// Notification to you
		await transporter.sendMail({
			from: `"${name}" <${process.env.GMAIL_USER}>`,
			replyTo: email,
			to: process.env.NOTIFY_EMAIL,
			subject: `New contact form message from ${name}`,
			text: message,
			html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p>${message}</p>
      `,
		})

		// Optional: confirmation email to the sender
		await transporter.sendMail({
			from: `"Your Blog" <${process.env.GMAIL_USER}>`,
			to: email,
			subject: 'Thanks for reaching out!',
			text: `Hi ${name}, thanks for your message — I'll get back to you soon.`,
		})

		return res.status(200).json({ message: 'Email sent successfully' })
	} catch (error) {
		console.error('Nodemailer error:', error)
		return res.status(500).json({ message: 'Something went wrong' })
	}
}
