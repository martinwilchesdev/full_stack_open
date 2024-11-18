const Notification = ({message, errorMessage}) => {
    if (!message) {
        return
    }

    return(
        <div className={errorMessage ? 'error' : 'success'}>
            {message}
        </div>
    )
}

export default Notification