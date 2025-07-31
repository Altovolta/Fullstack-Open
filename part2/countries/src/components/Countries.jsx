import Country from "./Country"

const DisplayCountryInList = ({country, handleShowCountry}) => {

    return (
        <li>
            {country.name.common}
            <button onClick={() => handleShowCountry(country.name.common)}>
                Show
            </button>
        </li>
    )
    
}

const Countries = ({countries, filter, handleShowCountry}) => {

    const filteredCountries = countries.filter(country => 
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    if (filteredCountries.length == 0 || !filter ) {
        return null
    }
    else if (filteredCountries.length > 10 ) {
        return( 
            <p>
                Too many matches, specify another filter
            </p>
        )
    } else if (filteredCountries.length > 1){
        return (
            <p>
                {filteredCountries.map(country => 
                <DisplayCountryInList key={country.cca2} country={country} handleShowCountry={handleShowCountry}/>
                )}
            </p>
        )
    }  
     else {
        return <Country country={filteredCountries[0]}/>
    }
} 

export default Countries