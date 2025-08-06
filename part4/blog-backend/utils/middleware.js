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

const errorHandler = (error, request, response) => {
    logger.error(error.message)
    response.status(500).send({ error: 'something went wrong' })
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    requestLogger
}