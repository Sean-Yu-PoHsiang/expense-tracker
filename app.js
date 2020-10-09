//require node modules
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

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

//set method override
app.use(methodOverride('_method'))

//route of home page
app.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then((categories) => {
          let filterCategory = '全部'
          return res.render('index', { records, categories, filterCategory })
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

      Category.find()
        .lean()
        .then(categories => {

          return res.render('index', { records: filteredRecords, categories, filterCategory })
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
  let temp = req.body.category.split('|')
  newRecord.category = temp[0]
  newRecord.icon = temp[1]

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
app.put('/edit/:id', (req, res) => {
  const id = req.params.id
  const reqBody = req.body
  let temp = req.body.category.split('|')

  return Record.findById(id)
    .then(record => {
      record.name = reqBody.name
      record.date = reqBody.date
      record.category = temp[0]
      record.icon = temp[1]
      record.amount = reqBody.amount
      return record.save()
    }).then(() => res.redirect('/'))
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

//route of delete record
app.delete('/delete/:id', (req, res) => {
  const filterCategory = req.query.category
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect(`/`))
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})


//server listen to localhost:3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})