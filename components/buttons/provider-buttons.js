import LogoutButton from './logout-button'
import GithubButton from './github-button'
import classes from '../../styles/provider-buttons.module.scss'

function ProviderButtons() {
    return (
        <ul className={`provider-list ${classes['provider-list']}`}>
            <GithubButton />
            <LogoutButton />
        </ul>
    )
}

export default ProviderButtons