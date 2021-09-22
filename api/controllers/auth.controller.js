const UserModel = require('../models/users.model')
const CommunitiesModel = require('../models/communities.model')
const { compareSync, hashSync } = require('bcrypt')
const { createToken } = require('../utils/auth')
const { handleError } = require('../utils/index')

exports.signUp = async (req, res) => {
  try {
    const encryptedPwd = hashSync(req.body.password, 10)

    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      mobile_number: req.body.mobile,
      password: encryptedPwd,
      community: req.body.community,
    })

    return res.status(200).json({ token: createToken(user) })
  } catch (err) {
    if (err.code === 11000) return handleError('User already in use', res, 400)

    return handleError(err, res)
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ mobile_number: req.body.mobile })
    if (!user) return handleError(400, 'wrong phone number', res)

    if (user && compareSync(req.body.password, user.password)) {
      return res.status(200).json({
        token: createToken(user),
        user: {
          mobile_number: req.body.mobile,
          email: user.email,
          name: user.name,
          id: user._id,
        },
      })
    }

    return handleError('wrong phone number/password', res, 403)
  } catch (err) {
    return handleError(err, res)
  }
}

exports.check = async (req, res, next) => {
  const { user } = res.locals
  console.log(user)

  res.status(200).json({
    msg: 'Token is Valid',
    user: {
      mobile_number: user.mobile_number,
      email: user.email,
      name: user.name,
      id: user._id,
    },
  })
}
