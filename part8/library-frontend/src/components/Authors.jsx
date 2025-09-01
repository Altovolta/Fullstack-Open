import { useEffect, useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useMutation, useQuery } from "@apollo/client/react"

const Authors = (props) => {

  const [ name, setName ] = useState('')
  const [ birthYear, setBirthYear ] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [ editAuthor, editAuthorResult ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  // Create notification for this if needed
  useEffect(() => {    
    if (editAuthorResult.data && editAuthorResult.data.editAuthor === null) {      
      console.log("person not found")    
    }  
  }, [editAuthorResult.data])

  const changeYear = (event) => {
    event.preventDefault()

    editAuthor({variables: {
      name,
      setBornTo: Number(birthYear)
    }})
    setName('')
    setBirthYear('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (<div> Is loading...</div>)
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={changeYear}>
        <div>
          name 
          <input 
            value={name} 
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born 
          <input 
            type='number' 
            value={birthYear} 
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">
          update author
        </button>
      </form>
    </div>
  )
}

export default Authors
