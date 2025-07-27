import { useState } from 'react'

import PersonForm from './components/PersonForm'
import DisplayPersons from './components/DisplayPersons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  
  const handleSubmition = (event) => {
    event.preventDefault()
    
    const personFound = persons.some(person => person.name === newName)
    if (personFound) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {name: newName, phone: newPhone}
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhone('')
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm newName={newName} newPhone={newPhone} 
      handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} handleSubmition={handleSubmition}/>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} />
    </div>
  )
}

export default App
