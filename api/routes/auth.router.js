const router = require('express').Router()
const { checkToken } = require('../utils/auth') // Authenticated Route
const {
  signUp,
  login,
  check,
  recoverPassSetUserData,
  recoverPassCheckCode,
  recoverPassSetNewPassword,
} = require('../controllers/auth.controller')

router.get('/check', checkToken, check)

router
  .post('/signup', signUp)
  .post('/login', login)
  .post('/recover-pass-data', recoverPassSetUserData)
  .post('/recover-pass-code', recoverPassCheckCode)
  .post('/recover-pass-pass', recoverPassSetNewPassword)

module.exports = router
