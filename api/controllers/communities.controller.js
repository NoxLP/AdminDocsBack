const DocumentsModel = require('../models/document.model')
const CommunitiesModel = require('../models/communities.model')
const FloorsModel = require('../models/floors.model')
const { handleError } = require('../utils')

exports.getMyCommunityDocuments = async (req, res) => {
  try {
    const { user } = res.locals
    const documents = await DocumentsModel.find({ community: user.community })
    console.log('All community odcs: ' + documents)

    res.status(200).json(documents)
  } catch (err) {
    handleError(err, res)
  }
}

exports.getUserRegisterCommunitiesDTOs = async (req, res) => {
  try {
    let communities = await CommunitiesModel.find().populate('floors', 'name')

    res.status(200).json(
      communities.map((comm) => ({
        id: comm._id,
        name: comm.name,
        floors: comm.floors,
      }))
    )
  } catch (err) {
    handleError(err, res)
  }
}
