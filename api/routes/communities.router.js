const router = require('express').Router()
const { checkToken } = require('../utils/auth') // Authenticated Route

const {
  getMyCommunityDocuments,
  getUserRegisterCommunitiesDTOs,
} = require('../controllers/communities.controller')

router
  .get('/docs', checkToken, getMyCommunityDocuments)
  .get('/register-dtos', getUserRegisterCommunitiesDTOs)

module.exports = router
