import { useState } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client/react"

const Books = (props) => {

  const [filter, setFilter] = useState('all genres')

  const allBooksResult = useQuery(ALL_BOOKS)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: {genre: filter },
    skip: filter === 'all genres'
  })

  if (!props.show) {
    return null
  }

  if (booksResult.loading || allBooksResult.loading) {
    return (<div> Loading books...</div>)
  }

  const allBooks = allBooksResult.data.allBooks

  const shownBooks = filter === 'all genres' 
  ? allBooks
  : booksResult.data.allBooks

  const getGenres = () => {
    const allGenres = allBooks.flatMap(book => book.genres)
    const genres = new Set([...allGenres, 'all genres'])
    return Array.from(genres)
  }

  const uniqueGenres = getGenres()

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
          {shownBooks.map((a) => (
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
