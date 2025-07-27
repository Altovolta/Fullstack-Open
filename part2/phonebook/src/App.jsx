import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => {
    console.log("Event value:", event.target.value)
    setNewName(event.target.value)
  }

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
      <form onSubmit={handleSubmition}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => <p key={index}>{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App