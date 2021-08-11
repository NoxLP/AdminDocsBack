const fs = require('fs')
const path = require('path')
const DocumentsModel = require('../models/document.model')
const { handleError } = require('../utils')

exports.getAllDocuments = async (req, res) => {
  try {
    const { user } = res.locals
    user = await user.populate('documents').execPopulate()
    console.log('All docs populated user: ' + user)

    res.status(200).json(user.documents)
  } catch (err) {
    handleError(err, res)
  }
}

exports.addDocument = async (req, res) => {
  try {
    const { user } = res.locals
    let document = {
      data: fs.readFileSync(path.resolve(`uploads/${req.file.filename}`)),
      contentType: req.file.mimetype,
      community: user.community,
      user: user._id,
      date: new Date(Date.now()),
    }
    if (req.body.category) document.category = req.body.category

    document = await DocumentsModel.create(document)

    user.documents.push(document._id)
    await user.save()

    res.status(200).json({ msg: 'Document added' })
  } catch (err) {
    handleError(err, res)
  }
}
