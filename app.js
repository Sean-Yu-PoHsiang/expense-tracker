//require node modules
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
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

app.use(routes)

//server listen to localhost:3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})