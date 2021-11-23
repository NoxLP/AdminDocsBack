const UserModel = require('../models/users.model')
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

    const documents = user.documents.map(doc => {
      const base64 = Buffer.from(doc.data).toString('base64')
      doc = doc.toObject();
      doc.data = base64
      return doc
    })

    res.status(200).json(documents)
  } catch (err) {
    handleError(err, res)
  }
}
