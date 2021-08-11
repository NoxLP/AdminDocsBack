const fs = require('fs')
const path = require('path')
const DocumentsModel = require('../models/document.model')
const { handleError } = require('../utils')

exports.addDocument = async (req, res) => {
  try {
    const { user } = res.locals
    console.log(user)
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
