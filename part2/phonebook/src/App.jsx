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

  const [notification, setNotification] = useState({message: null, isError: false})


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

  const handleUpdate = (updatedPersonData) => {
  
      personService.update(updatedPersonData.id, updatedPersonData)
      .then( updatedPerson => {
        setPersons(persons.map( person => person.id !== updatedPersonData.id ? person : updatedPerson))
        setNotification({message: `${updatedPerson.name} phone number has been updated`, isError: false})
      }).catch( error => {
        setNotification({message: `Information of ${updatedPerson.name} has already been removed from server`, isError: true})
        setPersons(persons.filter(person => person.id != updatedPerson.id))
      })
  }

  const handleSubmition = (event) => {
    event.preventDefault()
    
    const searchedPerson = persons.find(person => person.name === newName)

    const shouldUpdate = searchedPerson 
    ? confirm(`${searchedPerson.name} is already added to phonebook, replace the old number with a new one?`) 
    : false;

        
    if (searchedPerson && shouldUpdate) {
      const updatedPerson = {...searchedPerson, number: newPhone}

      handleUpdate(updatedPerson)

    } else {
      const newPersonInfo = {name: newName, number: newPhone}

      personService.create(newPersonInfo)
      .then(person => {
        setPersons(persons.concat(person))
        setNotification({message: `Added ${newPersonInfo.name}`, isError: false}) 
      }).catch(error => {
        setNotification({message: error.response.data.error, isError: true})
      })   
    }

    setTimeout(() => {    
      setNotification({message: null, isError: false})         
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
      <Notification notification={notification}/>
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
