const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


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
    me: (root, args, {currentUser}) => currentUser
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new GraphQLError('Unauthorized. Please log in', {
          extensions: {
            code: 'UNAUTHORIZED',
          }
        })
      }

      let author = await Author.findOne({ name: args.author})

      if (!author) {
        author = new Author({name: args.author, books: []})
      }
      
      const book = new Book({ ...args, author: author._id })
      author.books.push(book._id)

      try {
        await author.save()
        await book.save()
        await book.populate('author')
        pubsub.publish('BOOK_ADDED', {bookAdded: book})
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
    editAuthor: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new GraphQLError('Unauthorized.', {
          extensions: {
            code: 'UNAUTHORIZED',
          }
        })
      }

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED') 
    }
  }
}

module.exports = { resolvers }