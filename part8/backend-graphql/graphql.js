const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const typeDefs = `
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author!],
    me: User
  }

  type Mutation {
    addBook(
      title: String!, 
      author: String!, 
      published: Int, 
      genres: [String!]
    ): Book, 
    editAuthor(name: String!, setBornTo: Int): Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Could not create new book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            argumentName: "author",
            error
          }
        })
        }
      }
      
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
        await book.populate('author')
      } catch (error) {
        throw new GraphQLError('Could not create new book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            argumentName: "title",
            error
          }
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      if(!author || !args.setBornTo) { return null }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Could not update author', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [args.name, args.setBornTo],
            error
          }
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({...args})
      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Could not create user', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [args.username],
            error
          }
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if(!user || args.password !== 'securePass123') {
         throw new GraphQLError('Invalid user credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      } 

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

module.exports = { resolvers, typeDefs }