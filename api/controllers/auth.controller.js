const UserModel = require('../models/users.model')
const CommunitiesModel = require('../models/communities.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { handleError } = require('../utils')

exports.signUp = async (req, res) => {
  const encryptedPwd = bcrypt.hashSync(req.body.password, 10)
  console.log('signup: ' + req.body)

  try {
    const comm = CommunitiesModel.findById(req.body.communityId)

    await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPwd,
      community: comm._id,
    })

    const data = { email: user.email, name: user.name }
    const token = jwt.sign(data, process.env.SECRET, { expiresIn: '24h' })

    res.status(200).json({ token: token, ...data })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.login = (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(400).json({ error: 'wrong password or email' })

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          return res.status(500).json({ error: 'wrong password or email' })
        }

        const user_data = { username: req.body.name, email: req.body.email }
        const token = jwt.sign(user_data, process.env.SECRET, {
          expiresIn: '24h',
        })

        return res.status(200).json({ token: token, ...user_data })
      })
    })
    .catch((err) => handleError(err, res))
}
