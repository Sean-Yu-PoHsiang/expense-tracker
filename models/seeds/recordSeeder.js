const mongoose = require('mongoose')
const Record = require('../record.js')

const dummyRecords = [
  {
    name: "午餐",
    date: "2019-04-23",
    category: "餐飲食品",
    amount: 60
  },
  {
    name: "晚餐",
    date: "2019-04-23",
    category: "餐飲食品",
    amount: 60
  },
  {
    name: "捷運",
    date: "2019-04-23",
    category: "交通出行",
    amount: 120
  },
  {
    name: "電影：驚奇隊長",
    date: "2019-04-23",
    category: "休閒娛樂",
    amount: 220
  },
  {
    name: "租金",
    date: "2019-04-01",
    category: "家居物業",
    amount: 25000
  },
]

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
  Record.insertMany(dummyRecords)
  console.log('recordSeeder done')
})