const getAuthToken = () => {
    const user = localStorage.getItem('userBlogsApp')
    const token = user ? JSON.parse(user)?.token : null

    return {
        headers: {
            'Authorization': `Bearer ${token}` || null
        }
    }
}

export default {
    getAuthToken
}