import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, []);

  const handleUserName = (ev) => setUsername(ev.target.value)
  const handlePassword = (ev) => setPassword(ev.target.value)

  // Realizar login del usuario
  const handleLogin = () => {
    //
  }

  if (user === null) {
    return(
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>username</label>
            <input type="text" onChange={handleUserName} />
          </div>
          <div>
            <label>password</label>
            <input type="text" onChange={handlePassword} />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
