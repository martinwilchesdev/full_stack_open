import { useState, useEffect } from 'react'

import services from '../services/countries'

const CountryInfo = ({country}) => {
    const API_KEY = import.meta.env.VITE_API_KEY

    const [temperatureImage, setTemperatureImage] = useState('')
    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')

    useEffect(() => {
        services.getWeather(API_KEY, country.capital)
            .then(response => {
                setTemperatureImage(response.data.current.condition.icon)
                setTemperature(response.data.current.temp_c)
                setWind(response.data.current.wind_kph)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return(
        <div>
            <h1>{country.name.common}</h1>
            <ol>
                <li>capital: {country.capital}</li>
                <li>area: {country.area}</li>
            </ol>
            <div>
                <strong>languages:</strong>
                <ul>
                    {Object.values(country.languages).map((lang, index) => <li key={index}>{lang}</li>)}
                </ul>
            </div>
            <img src={country.flags.png} alt="flag" />
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>temperature {temperature} Celcius</p>
                <img src={temperatureImage} alt="" />
                <p>wind {wind} k/h</p>
            </div>
        </div>
    )
}

export default CountryInfo