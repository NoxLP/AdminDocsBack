const mongoose = require('mongoose')

const communitiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  address: {
    type: String,
    required: [true, 'Name is required'],
  },
})

const communitiesModel = mongoose.model('communities', communitiesSchema)
module.exports = communitiesModel
