import axios from 'axios'
const baseUrl = '/api/blogs'

import tokenHelper from '../helpers/authToken.jsx'

let headers = null

const getAll = async () => {
    headers = tokenHelper.getAuthToken()

    const response = await axios.get(baseUrl, headers)
    return response.data
}

export default { getAll }
