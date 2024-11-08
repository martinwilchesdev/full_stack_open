import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const api = 'https://api.weatherapi.com/v1/current.json?'

const getAll = () => axios.get(`${baseUrl}/all`)

const getCountry = (country) => axios.get(`${baseUrl}/name/${country}`)

const getWeather = (key, city) => axios.get(`${api}key=${key}&q=${city}`)

export default {
    getAll,
    getCountry,
    getWeather
}