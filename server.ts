import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/api/test', (_req, res) => {
  res.json({ message: 'Server is running' })
})

app.listen(3001, () => {
  console.log('Server running on port 3001')
})