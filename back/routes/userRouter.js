const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.put('/update/user/:ID_User', userController.updateUser)
router.get('/user/:ID_User', userController.getOneUser);
router.delete('/delete/user/:ID_User', userController.deleteUser)
router.delete('/delete/users', userController.deleteAllUsers)
router.get('/users', userController.getAllUsers)


module.exports = router