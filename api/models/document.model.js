const mongoose = require('mongoose')

const documentsSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: [true, 'Document is required'],
  },
  contentType: {
    type: String,
    required: [true, 'Document type is required'],
  },
  community: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Community is required'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Document is required'],
  },
  date: {
    type: Date,
    required: [true, 'Document is required'],
  },
  category: {
    type: String,
    enum: ['Invoice', 'Mail', 'Notice', 'Others'],
    default: 'Others',
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  comments: {
    type: String,
  },
})

const documentsModel = mongoose.model('documents', documentsSchema)
module.exports = documentsModel
