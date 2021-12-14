const DocumentsModel = require('../models/document.model')
const CommunitiesModel = require('../models/communities.model')
const FloorsModel = require('../models/floors.model')
const UsersModel = require('../models/users.model')
const { handleError } = require('../utils')

exports.getMyCommunityDocuments = async (req, res) => {
  try {
    const { user } = res.locals
    let documents = await DocumentsModel.find({ community: user.community })
    console.log('All community odcs: ' + documents)

    documents = documents.map((doc) => {
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

exports.getUserRegisterCommunitiesDTOs = async (req, res) => {
  try {
    const allCommunities = await CommunitiesModel.find()
      .populate('floors')
      .lean()

    //Return only empty floors
    const communities = allCommunities.reduce((acc, current, idx) => {
      const floors = current.floors
        .filter((floor) => !floor.user)
        .map((floor) => {
          return {
            id: floor._id,
            name: floor.name,
          }
        })

      if (floors.length > 0) {
        acc.push({
          id: current._id,
          name: current.name,
          floors: floors,
        })
      }

      return acc
    }, [])

    res.status(200).json(communities)
  } catch (err) {
    handleError(err, res)
  }
}
