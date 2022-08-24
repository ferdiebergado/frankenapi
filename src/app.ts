import 'dotenv/config'
import express from 'express'

const app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.json({status: "up"})
})

export default app
