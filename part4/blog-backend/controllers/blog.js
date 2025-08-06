const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
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