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

})

after(async () => {
    await mongoose.connection.close()
})