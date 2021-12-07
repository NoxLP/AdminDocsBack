const mongoose = require('mongoose')

const communitiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  floors: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'floors',
      required: [true, 'Floors are required'],
    },
  ],
})

const communitiesModel = mongoose.model('communities', communitiesSchema)
module.exports = communitiesModel
