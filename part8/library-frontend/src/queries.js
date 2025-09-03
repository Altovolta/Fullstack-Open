import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
      allAuthors {
      name
      born
      bookCount
      }
  }
`

export const ALL_BOOKS = gql`
query AllBooks($genre: String, $author: String) {
  allBooks(genre: $genre, author: $author) {
    id
    title
    published
    author {
      name
      id
      born
      bookCount
    }
    genres
  }
}
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int, $genres: [String!]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
      title
      published
      genres
      author {
        bookCount
        born
        id
        name
      }
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      id
      name
    }
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`


export const GET_USER_INFO = gql`
  query Me {
    me {
      id
      username
      favoriteGenre
    }
  }
`