const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/blog')
const app = express()


logger.info('Connecting to MongoDB...')

const mongoUrl = config.MONGODB_URI || 'mongodb://localhost:27017/blogs'
mongoose.connect(mongoUrl)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(() => logger.error('Error connecting to MongoDB:'))

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})