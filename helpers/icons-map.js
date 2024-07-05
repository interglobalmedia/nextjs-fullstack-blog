import * as SvgIconsComponent from '../components/social-icons'

const SocialIcon = ({ name, href, size = 8 }) => {
	const ComponentsMap = {
		github: SvgIconsComponent.Github,
		linkedin: SvgIconsComponent.Linkedin,
		twitter: SvgIconsComponent.Twitter,
		email: SvgIconsComponent.Email,
		sitemap: SvgIconsComponent.Sitemap,
		tumblr: SvgIconsComponent.Tumblr,
	}

	if (name in ComponentsMap) {
		const IconComponent = ComponentsMap[name]
		return (
			<a
				className="text-gray-500 transition hover:text-gray-600"
				target="_blank"
				rel="noopener noreferrer"
				href={href}
			>
				<IconComponent
					className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`}
				/>
			</a>
		)
	} else {
		return null
	}
}

export default SocialIcon
