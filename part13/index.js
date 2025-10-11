require('dotenv').config();
const express = require('express');
const Blog = require('./models/Blog');

const app = express()
app.use(express.json())


app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    res.status(400).send({error})
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const deleted = await Blog.destroy({ where: { id: req.params.id } })
    if (deleted === 0) {
      return res.sendStatus(404)
    }
    return res.sendStatus(204)
  } catch (error) {
    res.status(400).send({error})
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})

