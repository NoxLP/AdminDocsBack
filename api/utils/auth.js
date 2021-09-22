const jwt = require('jsonwebtoken')
const UserModel = require('../models/users.model')
const { handleError } = require('./index')

exports.checkToken = async (req, res, next) => {
  if (!req.headers?.token)
    return handleError(400, 'Token required in request headers', res)

  try {
    const jwtToken = await jwt.verify(req.headers?.token, process.env.SECRET)
    res.locals.user = await UserModel.find({
      mobile_number: jwtToken.mobile_number,
    }).exec()

    if (!res.locals.user) return handleError(400, 'user not valid', res)

    next()
  } catch (err) {
    next(err)
  }
}

exports.createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '24h' })
}
