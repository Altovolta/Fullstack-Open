import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    console.log("Event value:", event.target.value)
    setNewName(event.target.value)
  }

  const handleSubmition = (event) => {
    event.preventDefault()
    
    const personFound = persons.some(person => person.name === newName)
    if (personFound) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {name: newName}
    setPersons(persons.concat(newPerson))
    setNewName('')
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmition}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => <p key={index}>{person.name}</p>)}
    </div>
  )
}

export default App