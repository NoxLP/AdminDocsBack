const router = require('express').Router()
const { upload } = require('../utils/multer')
const { resizeImage } = require('../utils/sharp')

const {
  getAllDocuments,
  addDocument,
} = require('../controllers/documents.controller')

router.get('/', getAllDocuments)
router.post('/', upload.single('image'), resizeImage, addDocument)
/*router.get('/:id', getUserById)
router.delete('/:id', deleteUserById)
router.put('/:id', updateUser)*/

module.exports = router
