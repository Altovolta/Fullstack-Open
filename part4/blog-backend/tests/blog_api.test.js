const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


describe ('blog api', () => {

    test('blogs can be viewed returned content is json', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs can be viewed', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blogs are identified by id field', async () => {
        const response = await api.get('/api/blogs')
        assert(response.body[0].id)
    })

    test('creating a valid blog increases total amount of blogs', async () => {

        await api.post('/api/blogs')
            .send(helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.getBlogs()
        assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)

    })

    test('creating a blog saves it correctly', async () => {

        await api.post('/api/blogs').send(helper.newBlog)

        const blogs = await helper.getBlogs()

        const titles = blogs.map(blog => blog.title)
        assert(titles.includes(helper.newBlog.title))

    })

    test('creating a blog without likes returns 0 likes ', async () => {

        const newBlog = {
            title: 'No likes',
            author: 'Unlucky',
            url: 'https://no-likes.com/',
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        assert.strictEqual(response.body.likes, 0)

    })

    test('creating a blog without title returns status code 400', async () => {

        const newBlog = {
            author: 'Unlucky',
            url: 'https://no-likes.com/',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('creating a blog without url returns status code 400', async () => {

        const newBlog = {
            title: 'No likes',
            author: 'Unlucky',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('deleting a blog reduce the number of notes ', async () => {
        const initialBlogs = await helper.getBlogs()
        const blogToDelete = initialBlogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogs = await helper.getBlogs()
        assert.strictEqual(blogs.length, initialBlogs.length - 1)

    })

    test('deleting a blog that removes the blog', async () => {
        const initialBlogs = await helper.getBlogs()
        const blogToDelete = initialBlogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogs = await helper.getBlogs()

        const titles = blogs.map(blog => blog.title)
        assert(!titles.includes(blogToDelete.title))

    })


    test('updating a blog amount of likes, changes its likes', async () => {
        const likes = 50
        const initialBlogs = await helper.getBlogs()
        const blogToUpdate = initialBlogs[0]

        const updatedBlogData = { ...blogToUpdate, likes: likes }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlogData)
            .expect(200)

        const blogs = await helper.getBlogs()
        const updatedBlog = blogs.filter(blog => blog.title === blogToUpdate.title)
        assert.strictEqual(updatedBlog[0].likes, likes)

    })

    test('updating a blog with negative amount of likes fails', async () => {
        const initialBlogs = await helper.getBlogs()
        const blogToUpdate = initialBlogs[0]

        const updatedBlogData = { ...blogToUpdate, likes: -5 }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlogData)
            .expect(400)

    })
})

after(async () => {
    await mongoose.connection.close()
})