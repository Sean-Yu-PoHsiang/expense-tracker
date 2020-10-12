const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

//route of create page
router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

//route of post new record to data-base
router.post('/', (req, res) => {
  const newRecord = req.body
  let temp = req.body.category.split('|')
  newRecord.category = temp[0]
  newRecord.icon = temp[1]

  return Record.create(newRecord)
    .then(() => res.redirect('/'))
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

//route of edit page
router.get('/:id/edit', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const filterCategory = req.query.category
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect(`/`))
    .catch((err) => res.status(err).send(err).then(console.log(err)))
})

module.exports = router