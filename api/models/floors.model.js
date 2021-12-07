const mongoose = require('mongoose')

const floorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  community: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Community is required'],
    ref: 'communities',
  },
})

const floorsModel = mongoose.model('floors', floorsSchema)
module.exports = floorsModel
