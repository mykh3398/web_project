const Router = require('express')
const router = new Router()
const guestController = require('../controllers/guestController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', /*checkRole(1),*/ guestController.createGuest)
router.get('/:ID_Guest', /*checkRole(1),*/  guestController.getOneGuest)
router.put('/update/:ID_Guest', /*checkRole(1),*/  guestController.updateGuest)
router.delete('/delete/:ID_Guest', /*checkRole(1),*/  guestController.deleteGuest)
router.get('/', /*checkRole(1),*/ guestController.getAllGuests)

module.exports = router