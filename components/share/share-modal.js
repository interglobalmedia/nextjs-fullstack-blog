import classes from '../../styles/share-modal.module.scss'

function ShareModal({ modalVisible, shareData, handleClose }) {
    return (
        <div className={`${classes['share-modal']} ${modalVisible ? "opened" : "closed"}`}>
            <section className={classes['modal-header']}>
                <h3 className={classes['modal-title']}>Share via</h3>
                <button className={classes['close-button']} onClick={() => handleClose(false)}>
                    &times;
                </button>
            </section>
            <section className={classes['modal-body']}>
                <div className={classes.row}>
                    <div>
                        <button className={classes.button}>Facebook</button>
                    </div>
                    <div>
                        <button className={classes.button}>Twitter</button>
                    </div>
                    <div>
                        <button className={classes.button}>Linkedin</button>
                    </div>
                </div>
            </section>
            <section className={classes['modal-footer']}>
                <div className={classes['modal-footer-button']}>{shareData.url}</div>
                <button className={classes['modal-footer-button']}>Copy Link</button>
            </section>
        </div>
    )
}

export default ShareModal