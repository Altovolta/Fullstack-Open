const Author = require('./models/author')
const Book = require('./models/book')


const typeDefs = `
  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author!],
  }

  type Mutation {
    addBook(
      title: String!, 
      author: String!, 
      published: Int, 
      genres: [String!]
    ): Book, 
    editAuthor(name: String!, setBornTo: Int): Author
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
        const books = await Book.find({})
        return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks: async (root, args) => {
      const query = {}
      if (args.author) {
        const author = await Author.findOne({name: args.author})
        query.author = author ? author._id : null
      }
      if (args.genre) {
        query.genres = args.genre
      }

      return await Book.find(query).populate('author')
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({author: root.id})
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {

      let author = await Author.findOne({ name: args.author})

      if (!author) {
        author = new Author({name: args.author})
        await author.save()
      }
      
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
        await book.populate('author')
      } catch (error) {
        throw new GraphQLError('Coudnt create new book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return book
    },
    editAuthor: (root, args) => {
      const author =  authors.find(author => author.name === args.name)
      if(!author) { return null }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(author => author.name === args.name 
        ? updatedAuthor
        : author
      )

      return updatedAuthor
    }
  }
}

module.exports = { resolvers, typeDefs }