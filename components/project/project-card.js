import Image from '../image/image'
import Link from 'next/link'
import { Oswald } from 'next/font/google'
import { getTagLink } from '../posts/get-tag-link'
import classes from '../../styles/card.module.scss'

const oswald = Oswald({
	weight: ['400'],
	subsets: ['latin'],
	display: 'optional',
	variable: '--oswald-font',
})

const Card = ({ title, author, summary, date, imgSrc, href, tags }) => {
	return (
		<li className={`card ${classes.card}`}>
			<Link href={href}>
				<h2 className={classes['heading-two']}>
					{href ? (
						<Link href={href} aria-label={`Link to ${title}`}>
							{title}
						</Link>
					) : (
						title
					)}
				</h2>
				{imgSrc && (
					<figure className={classes.image}>
						<Image
							alt={title}
							src={imgSrc}
							className="object-cover object-center md:h-36 lg:h-48"
							width={600}
							height={400}
							layout="responsive"
						/>
						<figcaption
							className={`${classes.content} ${oswald.variable}`}
						>
							<p>{summary}</p>
							<p className={classes.tag}>
								{tags
									.map((tag) => getTagLink(tag))
									.reduce((prev, curr) => [prev, ', ', curr])}
							</p>
							Learn more &rarr;
						</figcaption>
					</figure>
				)}
			</Link>
		</li>
	)
}

export default Card
