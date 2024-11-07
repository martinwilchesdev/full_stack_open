const CountryInfo = ({country}) => {
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
            </div>
        </div>
    )
}

export default CountryInfo