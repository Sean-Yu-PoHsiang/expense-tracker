const mongoose = require('mongoose')
const Record = require('../record.js')

const dummyRecords = [
  {
    name: "午餐",
    date: "2019-04-23",
    category: "餐飲食品",
    icon: "fas fa-utensils",
    amount: 60
  },
  {
    name: "晚餐",
    date: "2019-04-23",
    category: "餐飲食品",
    icon: "fas fa-utensils",
    amount: 60
  },
  {
    name: "捷運",
    date: "2019-04-23",
    category: "交通出行",
    icon: "fas fa-shuttle-van",
    amount: 120
  },
  {
    name: "電影：驚奇隊長",
    date: "2019-04-23",
    category: "休閒娛樂",
    icon: "fas fa-grin-beam",
    amount: 220
  },
  {
    name: "租金",
    date: "2019-04-01",
    category: "家居物業",
    icon: "fas fa-home",
    amount: 25000
  },
]

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
  Record.insertMany(dummyRecords)
  console.log('recordSeeder done')
})