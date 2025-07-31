const CountryInformation = ({country}) => {
    return (
        <>  
            <p>
                Official name: {country.name.official}
            </p>
            <p>
                Region: {country.subregion} - {country.region}
            </p>
            <p>
                Capital:  {country.capital[0]} 
            </p>
            <p>
                Population: {country.population} 
            </p>
            <p>
                Area - {country.area}
            </p>
            
        </>
    )
}

const Languages = ({langs}) => {
    return (
        <ul>
            {Object.entries(langs).map(([code, lang]) => (
                <li key={code}> {lang} </li>
            ))}
        </ul>
    )
}

const Country = ({country}) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <CountryInformation country={country} />
            <h2>Languages</h2>
            <Languages langs={country.languages}/>
            <img src={country.flags.png} alt={country.flags.alt}/>
        </>

    )
}

export default Country