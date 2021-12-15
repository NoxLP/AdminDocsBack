const router = require('express').Router()
const { checkToken } = require('../utils/auth') // Authenticated Route
const { signUp, login, check } = require('../controllers/auth.controller')

router.get('/check', checkToken, check)

router
  .post('/signup', signUp) //body => {name, email, password}
  .post('/login', login)

module.exports = router
