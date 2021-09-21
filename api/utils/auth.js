const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { User } = require('../models/users.model')

exports.checkToken = async (req, res, next) => {
  if (!req.headers?.token) {
    return next(new createError.BadRequest('Token required in request headers'))
  }
  try {
    const jwtToken = await jwt.verify(
      req.headers?.token,
      process.env.JWT_SECRET
    )
    res.locals.user = await User.find({
      mobile_number: jwtToken.mobile_number,
    }).exec()

    if (!res.locals.user)
      return next(new createError.BadRequest('user not valid'))

    next()
  } catch (err) {
    next(err)
  }
}

exports.createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '24h' })
}
