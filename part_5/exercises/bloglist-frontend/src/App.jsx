import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import CreateBlogs from './components/CreateBlogs'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    // mensaje y color de la notificacion
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationColor, setNotificationColor] = useState('')

    // blogs a listar
    const [blogs, setBlogs] = useState([])

    // informacion del usuario
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    // informacion de los blogs
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        // Obtener la informacion del usuario guardada en el localStorage
        const authUser = localStorage.getItem('user_auth_blogs')
        if (authUser) {
            // Si hay informacion del usuario registrada en el localStorage se asigna al state user
            const loggedUser = JSON.parse(authUser)
            setUser(loggedUser)
        }
    }, [])

    useEffect(() => {
        // Si el usuario se encuentra logueado se consultan los blogs
        if (user)
            blogService.getAll().then((response) => setBlogs(response.data))
    }, [user])

    const handleCreateBlog = (ev) => {
        ev.preventDefault()

        const newBlog = {
            author,
            title,
            url,
        }

        blogService
            .create(newBlog)
            .then((response) => {
                const blogInfo = response.data

                setBlogs(blogs.concat(blogInfo))

                setNotificationMessage(
                    `a new blog ${blogInfo.title} by ${blogInfo.author}`
                )
                setNotificationColor('green')

                setUrl('')
                setTitle('')
                setAuthor('')
            })
            .catch((error) => {
                console.log('Error: ', error.response.data.message)
            })
            .finally(resetNotification())
    }

    // Realizar login del usuario
    const handleLogin = (ev) => {
        ev.preventDefault()

        if (username !== '' && password !== '') {
            loginService
                .login({
                    username,
                    password,
                })
                .then((response) => {
                    setUser(response.data)
                    localStorage.setItem(
                        'user_auth_blogs',
                        JSON.stringify(response.data)
                    )
                })
                .catch((e) => {
                    setNotificationMessage('wrong username or password')
                    setNotificationColor('red')
                })
                .finally(resetNotification())
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user_auth_blogs')
        setUser(null)
    }

    const resetNotification = () => {
        setTimeout(() => {
            setNotificationMessage('')
            setNotificationColor('')
        }, 4000)
    }

    if (user === null) {
        return (
            <>
                <LoginForm
                    username={username}
                    password={password}
                    onHandleLogin={handleLogin}
                    onHandlePassword={setPassword}
                    onHandleUsername={setUsername}
                    notificationColor={notificationColor}
                    notificationMessage={notificationMessage}
                />
            </>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            {notificationMessage !== '' ? (
                <Notification
                    notificationColor={notificationColor}
                    notificationMessage={notificationMessage}
                />
            ) : null}
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>logout</button>
            <CreateBlogs
                url={url}
                title={title}
                author={author}
                onHandleUrl={setUrl}
                onHandleTitle={setTitle}
                onHandleAuthor={setAuthor}
                onHandleCreateBlog={handleCreateBlog}
            />
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
