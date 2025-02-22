const CreateBlogs = (props) => {
    const handleAuthor = (ev) => props.onHandleAuthor(ev.target.value)
    const handleTitle = (ev) => props.onHandleTitle(ev.target.value)
    const handleUrl = (ev) => props.onHandleUrl(ev.target.value)

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={props.onHandleCreateBlog}>
                <div>
                    <label>title:</label>
                    <input
                        type="text"
                        value={props.title}
                        onChange={handleTitle}
                    />
                </div>
                <div>
                    <label>author:</label>
                    <input
                        type="text"
                        value={props.author}
                        onChange={handleAuthor}
                    />
                </div>
                <div>
                    <label>url:</label>
                    <input type="text" value={props.url} onChange={handleUrl} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlogs
