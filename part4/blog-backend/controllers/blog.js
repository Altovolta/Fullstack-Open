const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.status(200).json(blogs)
})


blogRouter.post('/', async (request, response) => {

    if (!request.user) {
        return response.status(401).send({ error: 'invalid user' })
    }

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: request.user.id,
        comments: [],
    })

    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()

    const populatedSavedBlog = await Blog.findById(savedBlog._id).populate('user')
    response.status(201).json(populatedSavedBlog)
})

blogRouter.delete('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)
    if (!request.user || !blog) {
        return response.status(400).json({ error: 'invalid user or blogId' })
    }

    if (blog.user.toString() !== request.user.id.toString()) {
        return response.status(401).json({ error: 'user is not the blog creator' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {

    const blogToUpdate = await Blog.findById(request.params.id).populate('user')
    if (!blogToUpdate) {
        response.status(404).send({ error: 'this blog does not exist' })
    } else {

        blogToUpdate.likes = request.body.likes

        const updatedBlog = await blogToUpdate.save()

        response.json(updatedBlog)
    }
})

blogRouter.post('/:id/comments', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user')
    if (!blog) {
        response.status(404).send({ error: 'this blog does not exist' })
    } else {
        blog.comments.push(request.body)
        const updatedBlog = await blog.save()
        response.json(updatedBlog)
    }
})

module.exports = blogRouter