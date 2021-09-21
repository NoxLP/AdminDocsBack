const router = require('express').Router()
const { checkToken } = require('../utils/auth') // Authenticated Route

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getAllUserDocuments,
} = require('../controllers/users.controller')

router.get('/', checkToken, getAllUsers)
router.get('/docs', checkToken, getAllUserDocuments)
router.get('/:id', getUserById)

router.delete('/:id', deleteUserById)
router.put('/:id', updateUser)

module.exports = router
