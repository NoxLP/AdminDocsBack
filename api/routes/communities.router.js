const router = require('express').Router()

const {
  getMyCommunityDocuments,
} = require('../controllers/communities.controller')

router.get('/docs', getMyCommunityDocuments)

module.exports = router
