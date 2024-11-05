import CountryInfo from './components/CountryInfo'

import { useState, useEffect } from 'react'

import services from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [countriesFilter, setCountriesFilter] = useState([])

  useEffect(() => {
    services.getAll()
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log(`Error: ${error}`)
      })
  }, [])

  const searchCountry = (e) => {
    const country = e.target.value

    setFilterCountry(country)
    setCountriesFilter(countries.filter(info => info.name.common.toLowerCase().includes(country.toLowerCase()?.trim())))
  }

  return(
    <div>
      <div>
        find countries
        <input onChange={searchCountry} />
      </div>
      <div>
        {
          filterCountry !== '' ?
            countriesFilter.length <= 10 ?
              countriesFilter.length === 1 ?
                <CountryInfo country={countriesFilter[0]} /> :
              <ol>{countriesFilter.map((country, index) => <li key={index}>{country.name.common}</li>)}</ol> :
            'Too many matches, specify another filter'
          : ''
        }
      </div>
    </div>
  )
}

export default App