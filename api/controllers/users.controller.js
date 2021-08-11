const UserModel = require('../models/users.model')
const { handleError } = require('../utils')

exports.getAllUsers = (req, res) => {
  UserModel.find()
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}

exports.getUserById = (req, res) => {
  UserModel.findById(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}

exports.deleteUserById = (req, res) => {
  UserModel.remove({ _id: req.params.id })
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}

exports.updateUser = (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}

exports.getAllUserDocuments = async (req, res) => {
  try {
    console.log(res.locals)
    let { user } = res.locals
    user = await user.populate('documents').execPopulate()
    console.log('All docs populated user: ' + user)

    res.status(200).json(user.documents)
  } catch (err) {
    handleError(err, res)
  }
}
