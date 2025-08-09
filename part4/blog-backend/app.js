require('express-async-errors')
const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const app = express()

logger.info('Connecting to MongoDB...')

const mongoUrl = config.MONGODB_URI || 'mongodb://localhost:27017/blogs'
mongoose.connect(mongoUrl)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(() => logger.error('Error connecting to MongoDB:'))

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app