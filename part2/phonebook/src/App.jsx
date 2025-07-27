import { useState } from 'react'

import PersonForm from './components/PersonForm'
import DisplayPersons from './components/DisplayPersons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])

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

    const newPerson = {name: newName, phone: newPhone}
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhone('')
  } 

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
