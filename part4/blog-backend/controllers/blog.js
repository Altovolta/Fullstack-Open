const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.status(200).json(blogs)
})

const getToken = request => {
    const auth = request.get('authorization')

    if (auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '')
    }
    return null
}

blogRouter.post('/', async (request, response) => {

    const decodedToken = jwt.verify(getToken(request), config.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(400).json({ error: 'invalid UserId' })
    }

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {

    const blogToUpdate = await Blog.findById(request.params.id)
    if (!blogToUpdate) {
        response.status(404).send({ error: 'this blog does not exist' })
    } else {

        blogToUpdate.likes = request.body.likes

        const updatedBlog = await blogToUpdate.save()

        response.json(updatedBlog)
    }
})

module.exports = blogRouter