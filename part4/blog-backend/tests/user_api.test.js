const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)



describe ('when there is one user in db', () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)

        const user = new User({
            username: 'Roberto',
            name: 'Roberto',
            passwordHash
        })

        await user.save()
    })

    test('can get users in db', async () => {
        const response = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, 1)
    })

    test('user with unique username can be created', async () => {

        const newUser = {
            username: 'Pepe',
            name: 'Pedro',
            password: 'HolaMundo15'
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const users = await helper.getUsers()

        const usernames = await users.map(user => user.username)

        assert(usernames.includes(newUser.username))
    })

    test('user with non unique username can not be created', async () => {

        const initialUsers = await helper.getUsers()
        const newUser = {
            username: 'Roberto',
            name: 'Pedro',
            password: 'HolaMundo15'
        }

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('The username already exists'))

        const endUsers = await helper.getUsers()
        assert.strictEqual(endUsers.length, initialUsers.length)
    })


    test('user with username smaller then 3 chars is not created', async () => {

        const initialUsers = await helper.getUsers()
        const newUser = {
            username: 'Ro',
            name: 'Roman',
            password: 'Hola'
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const endUsers = await helper.getUsers()

        assert.strictEqual(endUsers.length, initialUsers.length)
    })

    test('user with no username is not created', async () => {

        const initialUsers = await helper.getUsers()
        const newUser = {
            name: 'Roman',
            password: 'Hola'
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const endUsers = await helper.getUsers()

        assert.strictEqual(endUsers.length, initialUsers.length)
    })

    test('user with no password is not created', async () => {

        const initialUsers = await helper.getUsers()
        const newUser = {
            username: 'Pepito',
            name: 'Roman',
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const endUsers = await helper.getUsers()

        assert.strictEqual(endUsers.length, initialUsers.length)
    })

    test('user with password shorter than 3 chars is not created', async () => {

        const initialUsers = await helper.getUsers()
        const newUser = {
            username: 'Pepito',
            name: 'Roman',
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const endUsers = await helper.getUsers()

        assert.strictEqual(endUsers.length, initialUsers.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})