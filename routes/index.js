const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
router.use('/', home)

const CRUD = require('./modules/CRUD.js')
router.use('/CRUD', CRUD)

module.exports = router