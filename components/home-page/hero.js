import Image from "next/legacy/image";
import classes from './hero.module.scss'

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/profile_image.jpg"
                    alt="Maria Campbell profile image"
                    width={300}
                    height={300}
                />
            </div>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1>Hi, I'm Maria!</h1>
            <p>I blog about fullstack development as well as macOS, Command Line, and Git.</p>
        </section>
    )
}

export default Hero