import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import Button from './button';
import classes from '../../styles/share.module.scss'

function Share({ title, url }) {
    const [isShareApiAvailable, setIsShareApiAvailable] = useState(false)

    useEffect(() => {
        setIsShareApiAvailable(!!window.navigator.share);
    }, [])

    function handleSocialShare() {
        try {
            const res = window.navigator.share({
                title,
                text: `${title} by Maria D. Campbell (@letsbsocial1)`,
                url
            });

            toast.promise(res, {
                loading: {
                    title: 'Share the post with the world',
                    text: 'Select how you want to share the post',
                    dismiss: false
                },
                success: {
                    title: 'Shared successfully',
                    text: 'Thank you for sharing my post!',
                    dismiss: true
                },
                error: { title: 'So close', text: 'Oh okay.. Maybe next time :)', dismiss: true }
            });
        } catch (error) {
            // do nothing
        }
    }
    return (
        <ul className='space-y-2 sm:items-start sm:space-x-2 sm:space-y-0 xl:space-y-2 sm:flex xl:space-x-0 xl:block'>
            {isShareApiAvailable && (
                <li className={`w-full ${classes['share-list-item']}`}>
                    <Button
                        tracking={{
                            event: 'click',
                            value: 'Share Anywhere clicked',
                            name: 'Share Anywhere clicked'
                        }}
                        variant='secondary'
                        onClick={handleSocialShare}>
                        Share Anywhere
                    </Button>
                </li>
            )}
        </ul>
    )
}

export default Share