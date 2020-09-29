const express = require('express')

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('expense tracker')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})