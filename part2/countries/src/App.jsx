import { useState, useEffect } from 'react'

import countryService from './services/countries'
import weatherService from './services/weather'

import Countries from './components/Countries'

function App() {
  
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect( () => {
    countryService.getAll().
    then( countries => {
      setCountries(countries)
    })

  }, [] )

  useEffect( () => {

    const filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().includes(filter.toLowerCase()))

    if (filteredCountries.length == 1) {
      
      const [lat, lng] = filteredCountries[0].capitalInfo.latlng

      weatherService.getWeather(lat, lng)
      .then(response => {

        const newWeather = {
          temp: response.main.temp,
          feelsLike: response.main.feels_like,
          humidity: response.main.humidity,
          weather: response.weather[0].main,
          weatherIcon: response.weather[0].icon,
          wind: response.wind.speed
        }

        setWeather(newWeather)
      })
    }
      
  }, [filter])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowCountry = (name) => {
    setFilter(name)
  }

  return(
    <div>
      find countries <input value={filter} onChange={handleChange}></input>
      <Countries countries={countries} filter={filter} handleShowCountry={handleShowCountry} weather={weather}/>
    </div>
  )
}

export default App
