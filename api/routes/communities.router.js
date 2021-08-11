const router = require('express').Router()

const { getAllDocuments } = require('../controllers/communities.controller')

router.get('/', getAllDocuments)

module.exports = router
