const jwt = require('jsonwebtoken')
const UserModel = require('../models/users.model')
const { handleError } = require('./index')

exports.checkToken = async (req, res, next) => {
  if (!req.headers?.token)
    return handleError('Token required in request headers', res, 400)

  try {
    const jwtToken = await jwt.verify(req.headers?.token, process.env.SECRET)
    res.locals.user = await UserModel.findOne({
      mobile_number: jwtToken.mobile_number,
    }).exec()

    if (!res.locals.user) return handleError('user not valid', res, 400)

    next()
  } catch (err) {
    next(err)
  }
}

exports.createToken = (user) => {
  return jwt.sign(
    { mobile_number: user.mobile_number, id: user._id },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}
