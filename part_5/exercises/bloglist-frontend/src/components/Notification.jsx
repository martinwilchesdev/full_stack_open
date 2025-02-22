const Notification = (props) => {
    const customStyles = {
        borderColor: props.notificationColor,
        color: props.notificationColor,
    }

    return (
        <div className="notification" style={customStyles}>
            {props.notificationMessage}
        </div>
    )
}

export default Notification
