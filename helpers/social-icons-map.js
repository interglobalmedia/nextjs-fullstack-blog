import * as SvgIconsComponent from '../components/social-share-icons'

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
            >
                <IconComponent className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`} />
            </a>
        )
    } else {
        return null
    }
}

export default SocialShareIcon