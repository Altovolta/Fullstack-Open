import { useState, useEffect } from 'react'

import personService from './services/persons'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)


  const handleNameChange = (event) => setNewName(event.target.value)

  const handlePhoneChange = (event) => setNewPhone(event.target.value)

  const handleFilter  = (event) => setFilter(event.target.value)
  
  const handleDeletion = (id, name) => {

    if (confirm(`Delete ${name}?`)) {
      personService.remove(id).then( response => {
        setPersons(persons.filter(person => person.id != id))
      })
    }
  }

  const handleSubmition = (event) => {
    event.preventDefault()
    
    const searchedPerson = persons.find(person => person.name === newName)

    const shouldUpdate = searchedPerson 
    ? confirm(`${searchedPerson.name} is already added to phonebook, replace the old number with a new one?`) 
    : false;

        
    if (searchedPerson && shouldUpdate) {
      const updatedPerson = {...searchedPerson, number: newPhone}

      personService.update(searchedPerson.id, updatedPerson)
      .then( updatedPerson => {
        setPersons(persons.map( person => person.id !== searchedPerson.id ? person : updatedPerson))
        setMessage(`${updatedPerson.name} phone number has been updated`)
      }).catch( error => {
        setMessage(`Information of ${updatedPerson.name} has already been removed from server`)
        setPersons(persons.filter(person => person.id != updatedPerson.id))
        setIsError(true)
      })

    } else {
      const newPersonInfo = {name: newName, number: newPhone}

      personService.create(newPersonInfo)
      .then(person => {
        setPersons(persons.concat(person))
        setMessage(`Added ${newPersonInfo.name} `)  
      })   
    }

    setTimeout(() => {          
      setMessage(null)   
      setIsError(false)     
      }, 5000)    

    setNewName('')
    setNewPhone('')
  } 

  useEffect( () => {

    console.log("Obtaining persons...")

    personService.getAll().then( response => {
      console.log("Data:", response)

    setPersons(response)

    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>
      <Filter filter={filter} handler={handleFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newPhone={newPhone} 
      handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} handleSubmition={handleSubmition}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filter} deletionHandler={handleDeletion}/>
    </div>
  )
}

export default App
