const router = require('express').Router()

const { checkToken } = require('../utils/auth') // Authenticated Route
const usersRouter = require('./users.router')
const authRouter = require('./auth.router')
const communitiesRouter = require('./communities.router')
const documentsRouter = require('./documents.router')

router
  .use('/users', checkToken, usersRouter)
  .use('/auth', authRouter)
  .use('/communities', checkToken, communitiesRouter)
  .use('/documents', checkToken, documentsRouter)

router.get('/whoami', checkToken, (req, res) => {
  res.send(`hi there! ${res.locals.user.name}`)
})
router.get('/status', (req, res) => {
  res.send("I'm here and OK!")
})

module.exports = router
