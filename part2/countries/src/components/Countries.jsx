import Country from "./Country"

const Countries = ({countries, filter}) => {

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
                    <li key={country.cca2}>
                        {country.name.common}
                    </li>
                )}
            </p>
        )
    }  
     else {
        return <Country country={filteredCountries[0]}/>
    }
} 

export default Countries