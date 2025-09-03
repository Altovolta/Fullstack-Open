import { useState } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client/react"

const Books = (props) => {

  const [filter, setFilter] = useState('all genres')

  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (<div> Is loading...</div>)
  }


  const books = result.data.allBooks

  const getGenres = () => {
    const genres = new Set()

      books.forEach(book => {
        genres.add(...book.genres)
      })

      genres.add('all genres')
      return Array.from(genres)
    }

  const uniqueGenres = getGenres()

  const filteredBooks = books.filter(book => 
    filter === 'all genres' || book.genres.includes(filter)
  )

  return (
    <div>
      <h2>books</h2>
      <h4>
        In genre: {filter}
      </h4>
      {uniqueGenres.map(genre => 
      <button 
        key={genre} 
        onClick={() => setFilter(genre)}>
        {genre}
      </button>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
