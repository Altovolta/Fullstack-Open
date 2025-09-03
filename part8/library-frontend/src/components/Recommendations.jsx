import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "../queries"


const Recomendations = ({ show, genre }) => {
  
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  
  if (!show) {return null}
  
  if (booksResult.loading) {
    return <div>Loading recommendations...</div>
  }
  
  const books = booksResult.data.allBooks

  console.log(books)

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre {' '}
        <b>{genre}</b>
      </p>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
      {books.map(book => 
      <tr key={book.title}>
        <td>{book.title}</td>
        <td>{book.author.name}</td>
        <td>{book.published}</td>
      </tr>)}
      </tbody>
    </table>
    </div>
  )


}

export default Recomendations