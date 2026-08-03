import * as SvgIconsComponent from '../components/social-icons'

const LabelMap = {
	github: 'GitHub',
	linkedin: 'LinkedIn',
	twitter: 'Twitter',
	email: 'Email',
	sitemap: 'Sitemap',
	dev: 'Dev.to',
}

const SocialIcon = ({ name, href, size = 8 }) => {
	const ComponentsMap = {
		github: SvgIconsComponent.Github,
		linkedin: SvgIconsComponent.Linkedin,
		twitter: SvgIconsComponent.Twitter,
		email: SvgIconsComponent.Email,
		sitemap: SvgIconsComponent.Sitemap,
		dev: SvgIconsComponent.Dev,
	}

	if (name in ComponentsMap) {
		const IconComponent = ComponentsMap[name]
		const iconClassName = `fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`

		// No href means this icon is wrapped in a Next.js <Link> by the
		// parent (internal route) — skip our own <a> to avoid nesting anchors.
		if (!href) {
			return <IconComponent className={iconClassName} />
		}

		return (
			<a
				className="text-gray-500 transition hover:text-gray-600"
				target="_blank"
				rel="noopener noreferrer"
				href={href}
				aria-label={LabelMap[name]}
			>
				<IconComponent className={iconClassName} />
			</a>
		)
	} else {
		return null
	}
}

export default SocialIcon
