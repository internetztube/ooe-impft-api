const express = require('express')
const cors = require('cors')
const service = require('./service')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

let fetchedAt = null
const timestamp = () => parseInt(new Date() / 1000)
let data = null

app.get('/', async (req, res) => {
  if (!fetchedAt || fetchedAt + 60 < timestamp()) {
    data = await service()
    fetchedAt = timestamp()
  }
  res.json({fetchedAt, data})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
