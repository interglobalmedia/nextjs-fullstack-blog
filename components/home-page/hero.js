import Image from 'next/legacy/image'
import classes from '../../styles/hero.module.scss'

function Hero() {
	return (
		<section className={`hero ${classes.hero}`}>
			<div className={classes.image}>
				<Image
					src="/images/site/profile_image.jpg"
					alt="Maria Campbell profile image"
					width={300}
					height={300}
					layout="responsive"
				/>
			</div>
			<h1>
				{/*eslint-disable-next-line react/no-unescaped-entities */}
				Hi, I'm{' '}
				<a href="/about" target="_blank" rel="noopener noreferrer">
					Maria
				</a>
				!
			</h1>
			<p>
				I blog about cybersecurity, fullstack development as well as
				macOS, Command Line, shell scripting, Windows, Git, and ethics
				in technology.
			</p>
		</section>
	)
}

export default Hero
