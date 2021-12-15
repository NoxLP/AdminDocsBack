const router = require('express').Router()
const { upload } = require('../utils/multer')
const { resizeImage } = require('../utils/sharp')

const {
  addDocument,
  editDocument,
  removeDocument,
} = require('../controllers/documents.controller')

router.post('/', upload.single('image'), resizeImage, addDocument)

router.put('/:id', upload.single('image'), resizeImage, editDocument)

router.delete('/:id', removeDocument)

module.exports = router
