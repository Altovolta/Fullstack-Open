import { useState, useEffect } from 'react'
import axios from 'axios'

import PersonForm from './components/PersonForm'
import DisplayPersons from './components/DisplayPersons'
import Filter from './components/Filter'

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const handlePhoneChange = (event) => setNewPhone(event.target.value)

  const handleFilter  = (event) => setFilter(event.target.value)
  
  const handleSubmition = (event) => {
    event.preventDefault()
    
    const personFound = persons.some(person => person.name === newName)
    if (personFound) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPersonInfo = {name: newName, number: newPhone}

    axios.post('http://localhost:3001/persons', newPersonInfo)
    .then(response => {
      const newPerson = response.data
      setPersons(persons.concat(newPerson))
    })

    setNewName('')
    setNewPhone('')

  } 

  useEffect( () => {
    const uri = 'http://localhost:3001/persons'

    console.log("Obtaining persons...")

    axios.get(uri).then( response => {
      console.log("Obtained response. Status:", response.status)
      console.log("Data:", response.data)

    setPersons(response.data)

    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handler={handleFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newPhone={newPhone} 
      handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} handleSubmition={handleSubmition}/>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} filterValue={filter}/>
    </div>
  )
}

export default App
