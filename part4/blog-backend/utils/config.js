require('dotenv').config()

const PORT = process.env.PORT || 3003

const MONGODB_URI =  process.env.NODE_ENV !== 'test' ?
    process.env.MONGODB_URI : process.env.MONGODB_TEST_URI

const SECRET = process.env.SECRET

module.exports = { PORT, MONGODB_URI, SECRET }