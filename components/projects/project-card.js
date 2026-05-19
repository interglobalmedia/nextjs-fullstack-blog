import Image from '../image/image'
import Link from 'next/link'
import { Oswald } from 'next/font/google'
import { Fragment } from 'react'
import { getProjectTagLink } from './get-project-tag-link'
import classes from '../../styles/project-card.module.scss'

const oswald = Oswald({
	weight: ['400'],
	subsets: ['latin'],
	display: 'optional',
	variable: '--oswald-font',
})

const Card = ({
	title,
	author,
	repository,
	website,
	summary,
	imgSrc,
	tags,
	slug,
	more,
}) => {
	console.log('slug:', slug, 'imgSrc:', imgSrc)
	return (
		<li className={`card ${classes.card}`}>
			<h2 className={classes['heading-two']}>
				{slug ? (
					<Link
						href={`/projects/${slug}`}
						aria-label={`Link to ${title}`}
					>
						{title}
					</Link>
				) : (
					title
				)}
			</h2>
			{imgSrc && (
				<figure className={classes.image}>
					<div style={{ position: 'relative' }}>
						<Image
							alt={title}
							src={`/images/projects/${slug}/${imgSrc}`}
							className="object-cover object-center md:h-36 lg:h-48"
							fill
							unoptimized={imgSrc?.endsWith('.gif')}
							sizes="(max-width: 768px) 100vw, 50vw"
							style={{ objectFit: 'cover' }}
						/>
					</div>
					<figcaption
						className={`${classes.content} ${oswald.variable}`}
					>
						<p>{summary}</p>
						<p className={classes.tag}>
							{tags.map((tag, index) => (
								<Fragment key={tag}>
									{getProjectTagLink(tag)}
									{index < tags.length - 1 && ', '}
								</Fragment>
							))}
						</p>
					</figcaption>
				</figure>
			)}
		</li>
	)
}

export default Card
