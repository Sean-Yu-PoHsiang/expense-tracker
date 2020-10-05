//require node modules
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

const Record = require('./models/record.js')

//mongodb connection setting
const MONGODB_URI = 'mongodb://localhost/expense-tracker'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
//connection error
db.on('error', () => {
  console.log('mongodb error')
})
//connection success
db.once('open', () => {
  console.log('mongodb connected')
})

//set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//route of home page
app.get('/', (req, res) => {
  let totalAmount = 0
  return Record.find()
    .lean()
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      return records
    })
    .then(records => res.render('index', { records, totalAmount }))
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

//server listen to localhost:3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})