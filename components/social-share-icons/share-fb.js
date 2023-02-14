import SocialIcon from '../../helpers/icons-map'

export default function ShareFB({ url }) {
    const intentUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    return <SocialIcon name="facebook" href={intentUrl} size="6" />
}