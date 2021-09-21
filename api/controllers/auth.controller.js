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
    if (err.code === 11000) return handleError(400, 'User already in use', res)

    return handleError(500, err, res)
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

    return handleError(403, 'wrong phone number/password', res)
  } catch (err) {
    return handleError(500, err, res)
  }
}
