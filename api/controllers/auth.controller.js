const UserModel = require('../models/users.model')
const CommunitiesModel = require('../models/communities.model')
const FloorsModel = require('../models/floors.model')
const { compareSync, hashSync } = require('bcrypt')
const { createToken } = require('../utils/auth')
const { handleError } = require('../utils/index')

exports.signUp = async (req, res) => {
  try {
    const encryptedPwd = hashSync(req.body.password, 10)

    const community = await CommunitiesModel.findById(req.body.community)
    if (!community.floors.some((floor) => floor._id == req.body.floor)) {
      throw 'Wrong floor for given community'
    }

    const bodyUser = {
      name: req.body.name,
      email: req.body.email,
      mobile_number: req.body.mobile_number,
      password: encryptedPwd,
      community: req.body.community,
      floor: req.body.floor,
    }
    console.log(bodyUser)
    const user = await UserModel.create(bodyUser)

    await FloorsModel.updateOne(
      { _id: req.body.floor },
      { user: user._id, community: req.body.community }
    )

    return res.status(200).json({
      token: createToken(user),
      user: await user.getProfile(),
    })
  } catch (err) {
    if (err.code === 11000) return handleError('User already in use', res, 400)

    return handleError(err, res)
  }
}

exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ mobile_number: req.body.mobile })
    if (!user) return handleError(400, 'wrong phone number', res)

    if (user && compareSync(req.body.password, user.password)) {
      return res.status(200).json({
        token: createToken(user),
        user: await user.getProfile(),
      })
    }

    return handleError('wrong phone number/password', res, 403)
  } catch (err) {
    return handleError(err, res)
  }
}

exports.check = async (req, res) => {
  const { user } = res.locals

  res.status(200).json({
    msg: 'Token is Valid',
    user: await user.getProfile(),
  })
}

exports.recoverPassSetUserData = async (req, res) => {}

exports.recoverPassCheckCode = async (req, res) => {}

exports.recoverPassSetNewPassword = async (req, res) => {}
