const mongoose = require('mongoose')

const documentsSchema = new mongoose.Schema({
  data: {
    type: String,
    required: [true, 'Document is requried'],
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
  },
})

const documentsModel = mongoose.model('documents', documentsSchema)
module.exports = documentsModel
