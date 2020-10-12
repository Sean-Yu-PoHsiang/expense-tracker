const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
router.use('/', home)

const records = require('./modules/records.js')
router.use('/records', records)

module.exports = router