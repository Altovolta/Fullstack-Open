const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {

    const user = await User.find({})

    const selectedUser = user[0]

    const blog = new Blog({ ...request.body, user: selectedUser.id })

    const savedBlog = await blog.save()

    selectedUser.blogs = selectedUser.blogs.concat(savedBlog._id)

    await selectedUser.save()

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