const DocumentsModel = require('../models/document.model')
const { handleError } = require('../utils')

exports.getAllDocuments = async (req, res) => {
  try {
    const { user } = res.locals
    const documents = await DocumentsModel.find({ community: user.community })
    console.log('All community odcs: ' + documents)

    res.status(200).json(documents)
  } catch (err) {
    handleError(err, res)
  }
}
