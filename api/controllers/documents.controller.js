const fs = require('fs')
const path = require('path')
const DocumentsModel = require('../models/document.model')
const { handleError } = require('../utils')

exports.addDocument = async (req, res) => {
  console.log(req.body)
  try {
    const { user } = res.locals
    let document = {
      data: fs.readFileSync(path.resolve(`uploads/${req.file.filename}`)),
      contentType: req.file.mimetype,
      community: user.community,
      user: user._id,
      date: new Date(Date.now()),
    }
    document.category = req.body.category ?? 'Otros'
    document.name = req.body.name ?? req.file.filename
    document.comments = req.body.comments ?? ''
    console.log(document)

    document = await DocumentsModel.create(document)

    user.documents.push(document._id)
    await user.save()

    res.status(200).json({ msg: 'Document added' })
  } catch (err) {
    handleError(err, res)
  }
}

exports.editDocument = async (req, res) => {
  try {
    const document = {
      date: new Date(Date.now()),
      category: req.body.category ?? 'Otros',
      name: req.body.name ?? req.file.filename,
      comments: req.body.comments ?? '',
    }
    if (req.file) {
      document.data = fs.readFileSync(
        path.resolve(`uploads/${req.file.filename}`)
      )
      document.contentType = req.file.mimetype
    }

    console.log(document)

    await DocumentsModel.updateOne({ _id: req.params.id }, document)

    res.status(200).json({ msg: 'Document edited' })
  } catch (err) {
    handleError(err, res)
  }
}
