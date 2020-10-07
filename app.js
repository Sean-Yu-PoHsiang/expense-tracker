//require node modules
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

const Record = require('./models/record.js')
const Category = require('./models/category.js')

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

//set public file
app.use(express.static('public'))

//route of home page
app.get('/', (req, res) => {
  let totalAmount = 0
  return Record.find()
    .lean()
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      return records
    }).then(records => {
      Category.find()
        .lean()
        .then((categories) => {
          let filterCategory = '全部'
          return res.render('index', { records, totalAmount, categories, filterCategory })
        })
        .catch((err) => res.status(err).send(err).then(console.log(err)))
    })
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

//route of index filter
app.get('/filter', (req, res) => {
  const filterCategory = req.query.category

  return Record.find()
    .lean()
    .then(records => {
      let filteredRecords = records.filter(record => record.category === filterCategory)
      if (filterCategory === '全部') {
        filteredRecords = records
      }

      let totalAmount = 0
      filteredRecords.forEach(record => totalAmount += record.amount)

      Category.find()
        .lean()
        .then(categories => {

          return res.render('index', { records: filteredRecords, totalAmount, categories, filterCategory })
        })
        .catch((err) => res.status(err).send(err).then(console.log(err)))

    })
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

//route of create page
app.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

//route of post new record to data-base
app.post('/new', (req, res) => {
  const newRecord = req.body
  return Record.create(newRecord)
    .then(() => res.redirect('/'))
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

//route of edit page
app.get('/edit/:id', (req, res) => {
  const id = req.params.id
  return Category.find()
    .lean()
    .then(categories => {
      Record.findById(id)
        .lean()
        .then(record => res.render('edit', { categories, record }))
        .catch((err) => res.status(err).send(err).then(console.log(err)))
    })
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

//route of post edit 
app.post('/edit/:id', (req, res) => {
  const id = req.params.id
  const reqBody = req.body
  return Record.findById(id)
    .then(record => {
      record.name = reqBody.name
      record.date = reqBody.date
      record.category = reqBody.category
      record.amount = reqBody.amount
      return record.save()
    }).then(() => res.redirect('/'))
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

//route of delete record
app.post('/delete/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})


//server listen to localhost:3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})