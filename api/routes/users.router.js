const router = require('express').Router()
const { authUser } = require('../utils') // Authenticated Route

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getAllUserDocuments,
} = require('../controllers/users.controller')

router.get('/', authUser, getAllUsers)
router.get('/docs', authUser, getAllUserDocuments)
router.get('/:id', getUserById)

router.delete('/:id', deleteUserById)
router.put('/:id', updateUser)

module.exports = router
