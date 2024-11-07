import CountryInfo from './components/CountryInfo'
import CountriesList from './components/CountriesList'

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

  const onHandleShowInfo = (country) => {
    const countryName = country.toLowerCase()

    services.getCountry(countryName)
      .then(response => {
        setCountriesFilter([response.data])
      })
      .catch(error => {
        console.log(error)
      })
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
                <CountryInfo country={countriesFilter[0]} />
              : <CountriesList countries={countriesFilter} onShowInfo={onHandleShowInfo} />
            : 'Too many matches, specify another filter'
          : ''
        }
      </div>
    </div>
  )
}

export default App