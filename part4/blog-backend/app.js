const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')

const app = express()

logger.info('Connecting to MongoDB...')

const mongoUrl = config.MONGODB_URI || 'mongodb://localhost:27017/blogs'
mongoose.connect(mongoUrl)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(() => logger.error('Error connecting to MongoDB:'))

app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app