const router = require('express').Router()
const { checkToken } = require('../utils/auth') // Authenticated Route
const { signUp, login, check } = require('../controllers/auth.controller')

router
  .post('/signup', signUp) //body => {name, email, password}
  .post('/login', login)
  .get('/check', checkToken, check)

module.exports = router
