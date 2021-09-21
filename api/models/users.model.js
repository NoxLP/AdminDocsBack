const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator(value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          value
        )
      },
    },
    unique: [true, 'This is email is registered'],
  },
  mobile_number: {
    type: String,
    required: [true, 'Mobile_number is required'],
    validate: {
      validator(value) {
        return /^\d{8,12}$/.test(value)
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
  community: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Community is required'],
  },
  documents: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'documents',
    },
  ],
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel
