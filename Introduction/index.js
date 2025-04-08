require('dotenv').config()
const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello Duniya!')
})
app.get('/twitter', (req, res) => {
    res.send("Amit Prajapati")
})
app.get('/login', (req, res) => {
    res.send("<h1>Please login</h1>")
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})