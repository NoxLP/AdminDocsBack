const UserModel = require('../models/users.model')
const FloorsModel = require('../models/floors.model')
const { handleError } = require('../utils')

// TODO: Not used? Needs separated auth flow? Review this
/*exports.getAllUsers = (req, res) => {
  UserModel.find()
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}
*/
exports.getUserById = (req, res) => {
  UserModel.findById(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}

exports.deleteUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).lean()
    await UserModel.remove({ _id: req.params.id })

    await FloorsModel.updateOne({ _id: req.params.id }, { user: null })

    return res.status(200).json(response)
  } catch (err) {
    handleError(err, res)
  }
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

    const documents = user.documents.map((doc) => {
      // Get mongo buffer as base64 image
      const base64 = Buffer.from(doc.data).toString('base64')
      // Then get document as plain object, if done first the previous line fails,
      // if not done, there are problems overwriting data property
      doc = doc.toObject()
      // Now change buffer data to base64 data
      doc.data = base64
      return doc
    })

    res.status(200).json(documents)
  } catch (err) {
    handleError(err, res)
  }
}
