const router = require('express').Router()
const { upload } = require('../utils/multer')
const { resizeImage } = require('../utils/sharp')

const { addDocument } = require('../controllers/documents.controller')

router.post('/', resizeImage, upload.single('image'), addDocument)

module.exports = router
