import { useState, useEffect } from 'react'

import countryService from './services/countries'
import Countries from './components/Countries'

function App() {
  
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect( () => {
    countryService.getAll().
    then( countries => {
      setCountries(countries)
    })

  }, [] )

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return(
    <div>
      find countries <input value={filter} onChange={handleChange}></input>
      <Countries countries={countries} filter={filter}/>
    </div>
  )
}

export default App
