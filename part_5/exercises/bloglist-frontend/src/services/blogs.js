import axios from 'axios'
const baseUrl = '/api/blogs'

// helper para extraer el token de autorizacion registrado en el localStorage
import tokenHelper from '../helpers/authToken.jsx'

let headers = null

const getAll = async () => {
    headers = tokenHelper.getAuthToken()

    const response = await axios.get(baseUrl, headers)
    return response.data
}

export default { getAll }
