const router = require('express').Router()

const {
  //getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getAllUserDocuments,
} = require('../controllers/users.controller')

// TODO: Not used? Needs separated auth flow? Review this
//router.get('/', getAllUsers)
router.get('/docs', getAllUserDocuments)
router.get('/:id', getUserById)

router.delete('/:id', deleteUserById)
router.put('/:id', updateUser)

module.exports = router
