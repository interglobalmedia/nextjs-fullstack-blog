import * as SvgIconsComponent from '../components/social-share-icons'

const LabelMap = {
	twitter: 'Share on Twitter',
	linkedin: 'Share on LinkedIn',
	'social-hacker-news': 'Share on Hacker News',
	'social-reddit': 'Share on Reddit',
}

const SocialShareIcon = ({ name, href, size = 8 }) => {
	const ComponentsMap = {
		twitter: SvgIconsComponent.Twitter,
		linkedin: SvgIconsComponent.Linkedin,
		'social-hacker-news': SvgIconsComponent.SocialHackerNews,
		'social-reddit': SvgIconsComponent.SocialReddit,
	}

	if (name in ComponentsMap) {
		const IconComponent = ComponentsMap[name]
		return (
			<a
				className="text-gray-500 transition hover:text-gray-600"
				target="_blank"
				rel="noopener noreferrer"
				href={href}
				aria-label={LabelMap[name]}
			>
				<IconComponent className="bg-white" />
			</a>
		)
	} else {
		return null
	}
}

export default SocialShareIcon
