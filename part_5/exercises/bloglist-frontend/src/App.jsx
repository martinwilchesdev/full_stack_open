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
        const authUser = localStorage.getItem('userBlogsApp')
        if (authUser) {
            const loggedUser = JSON.parse(authUser)
            setUser(loggedUser)
        }
    }, [])

    useEffect(() => {
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
                    setUser(response)
                    localStorage.setItem('userBlogsApp', JSON.stringify(response))
                })
                .catch((e) => {
                    console.log('Error: ', e.response.data.error)
                })
        }
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
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
