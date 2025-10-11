require('dotenv').config();
const { Sequelize, QueryTypes, Model } = require('sequelize')
const express = require('express')

const app = express()
const sequelize = new Sequelize(process.env.DATABASE_URL)

app.get('/api/blogs', async (req, res) => {

  const blogs = await sequelize.query('SELECT * FROM blogs;', { type: QueryTypes.SELECT })
  res.json(blogs)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})

