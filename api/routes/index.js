const router = require('express').Router()

const { authUser } = require('../utils') // Authenticated Route
const usersRouter = require('./users.router')
const authRouter = require('./auth.router')
const communitiesRouter = require('./communities.router')
const documentsRouter = require('./documents.router')

router
  .use('/users', usersRouter)
  .use('/auth', authRouter)
  .use('/communities', authUser, communitiesRouter)
  .use('/documents', authUser, documentsRouter)

router.get('/whoami', authUser, (req, res) => {
  res.send(`hi there! ${res.locals.user.name}`)
})
router.get('/status', authUser, (req, res) => {
  res.send(`I'm here and OK! ${res.locals.user.name}`)
})

module.exports = router
