const router = require('express').Router()
const { upload } = require('../utils/multer')
const { resizeImage } = require('../utils/sharp')

const { addDocument, editDocument } = require('../controllers/documents.controller')

router.post('/', upload.single('image'), resizeImage, addDocument)
router.post('/:id', upload.single('image'), resizeImage, editDocument)

module.exports = router
