const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info(request.method, request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {

    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'The username already exists' })  }

    logger.error(error.message)
    response.status(500).send({ error: 'something went wrong' })
    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    requestLogger
}