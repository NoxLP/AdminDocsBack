const multer = require('multer')
const createError = require('http-errors')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${file.originalname}-${Date.now()}.${ext}`)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new createError.UnsupportedMediaType({ msg: 'Image not valid' }))
  }
}

exports.upload = multer({ storage, fileFilter })
