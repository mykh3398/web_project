const Router = require('express')
const router = new Router()
const classController = require('../controllers/apartmentClassController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', /*checkRole(1),*/ classController.create)
router.put('/', checkRole(1), classController.update)
router.get('/classes', classController.getAll)
router.delete('/:ID_Apart_Class', classController.deleteApartClass)


module.exports = router