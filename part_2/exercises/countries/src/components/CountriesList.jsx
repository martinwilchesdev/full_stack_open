const CountriesList = ({countries, onShowInfo}) => {
    return(
        <ol>
            {countries.map((country, index) => (
                <li key={index}>{country.name.common} <button onClick={() => onShowInfo(country.name.common)}>show</button></li>
            ))}
        </ol>
    )
}

export default CountriesList