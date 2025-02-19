import axios from 'axios'
const baseUrl = '/api/login'

const login = async (data) => {
    const response = await axios.post(baseUrl, data)
    return response
}

export default { login }