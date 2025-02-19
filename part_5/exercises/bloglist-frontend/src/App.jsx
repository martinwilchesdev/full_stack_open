import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
        if (user) blogService.getAll().then((response) => setBlogs(response))
    }, [user])

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
                    console.log('Error: ', e.response.data.error)
                })
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user_auth_blogs')
        setUser(null)
    }

    if (user === null) {
        return (
            <Login
                username={username}
                password={password}
                onHandleLogin={handleLogin}
                onHandlePassword={setPassword}
                onHandleUsername={setUsername}
            />
        )
    }

    return (
        <div>
            <button onClick={handleLogout}>logout</button>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
