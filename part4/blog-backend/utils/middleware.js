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
        return response.status(400).json({ error: 'The username already exists' })
    }else if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    }

    logger.error(error.message)
    response.status(500).send({ error: 'something went wrong' })
    next(error)
}

const tokenExtractor = (request, response, next) => {

    const auth = request.get('authorization')

    if (auth && auth.startsWith('Bearer ')) {
        const token = auth.replace('Bearer ', '')
        request.token = token
    } else {
        request.token = null
    }

    next()
}


module.exports = {
    unknownEndpoint,
    errorHandler,
    requestLogger,
    tokenExtractor
}