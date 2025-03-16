const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((a, b) => {
        return a + b.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    let favoriteBlog = null
    blogs.forEach(blog => {
        if (favoriteBlog) {
            if (blog.likes > favoriteBlog.likes) favoriteBlog = blog
        } else {
            favoriteBlog = blog
        }
    })

    return favoriteBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}