import Notification from './Notification'

const LoginForm = (props) => {
    const handleUserName = (ev) => props.onHandleUsername(ev.target.value)
    const handlePassword = (ev) => props.onHandlePassword(ev.target.value)

    return (
        <div>
            <h2>log in to application</h2>
            {props.notificationMessage !== '' ? (
                <Notification
                    notificationColor={props.notificationColor}
                    notificationMessage={props.notificationMessage}
                />
            ) : null}
            <form onSubmit={props.onHandleLogin}>
                <div>
                    <label>username</label>
                    <input
                        type="text"
                        onChange={handleUserName}
                        value={props.username}
                    />
                </div>
                <div>
                    <label>password</label>
                    <input
                        type="password"
                        onChange={handlePassword}
                        value={props.password}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
