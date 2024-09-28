const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const authMiddleware = require('../middlewares/authentication')

router.get('/profile/:id',authMiddleware.authMiddleware,userController.profile)
router.put('/updateProfile',authMiddleware.authMiddleware,userController.updateProfile)

module.exports = router