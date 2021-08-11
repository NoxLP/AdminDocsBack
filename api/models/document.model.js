const mongoose = require('mongoose')

const documentsSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: [true, 'Document is requried'],
  },
  contentType: {
    type: String,
    required: [true, 'Document type is requried'],
  },
  community: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Community is requried'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Document is requried'],
  },
  date: {
    type: Date,
    required: [true, 'Document is requried'],
  },
  category: {
    type: String,
    enum: ['Factura', 'Correspondencia', 'Aviso', 'Otros'],
    default: 'Otros',
  },
})

const documentsModel = mongoose.model('documents', documentsSchema)
module.exports = documentsModel
