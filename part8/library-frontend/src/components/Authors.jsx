import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useMutation, useQuery } from "@apollo/client/react"
import Select from 'react-select'

const Authors = (props) => {

  const [selectedOption, setSelectedOption] = useState(null)
  const [ birthYear, setBirthYear ] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  const changeYear = (event) => {
    event.preventDefault()

    editAuthor({variables: {
      name: selectedOption.value,
      setBornTo: Number(birthYear)
    }})
    setBirthYear('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (<div> Is loading...</div>)
  }

  const editBirthYear = () => {
    return (
      <>
      <h2>Set birthyear</h2>
      <form onSubmit={changeYear}>
        <Select 
          onChange={setSelectedOption}
          options={options}
          isSearchable={true}
          noOptionsMessage="No authors found"
        />
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
      </>
    )
  }

  const authors = result.data.allAuthors

  const options = []
  authors.forEach(author => {
    options.push({
      value: author.name,
      label: author.name
    })
  })

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
      {!props.user ? null : editBirthYear()}
    </div>
  )
}

export default Authors
