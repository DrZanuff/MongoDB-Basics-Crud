const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Ok' })
})

const DB_USER = process.env.USER
const DB_PASSWORD = process.env.PASSWORD

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ye4tn.mongodb.net/databaseapi?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('DB Conectado')
    app.listen(3000, () => console.log('Rodando o servidor na porta 3000'))
  })
  .catch((e) => console.log(e))
