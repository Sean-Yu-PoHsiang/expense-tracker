const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

//route of home page
router.get('/', (req, res) => {
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
router.get('/filter', (req, res) => {
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

module.exports = router