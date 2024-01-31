const Router = require('express')
const router = new Router()
const apartmentController = require('../controllers/apartmentController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', /*checkRole(1),*/ apartmentController.create)
router.put('/update/:ID_Apart', /*checkRole(1),*/ apartmentController.updateApartment)
router.delete('/delete/:ID_Apart', /*checkRole(1),*/ apartmentController.deleteApartment)
router.get('/all', apartmentController.getAll)
router.get('/:ID_Apart', apartmentController.getOne)
router.get('/name/:ID_Apart', apartmentController.getName)




module.exports = router