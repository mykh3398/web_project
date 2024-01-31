const Router = require('express')
const router = new Router()
const bookingController = require('../controllers/bookingController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create',  bookingController.createBooking)
router.post('/createGuestBooking',  bookingController.createGuestBooking)
//router.put('/update', bookingController.updateBooking) ?
router.delete('/delete/:ID_Booking', bookingController.deleteBooking)
router.delete('/deleteAllBookings', bookingController.deleteAllBookings)
router.get('/free', bookingController.getAllFreeRooms)
router.get('/',  bookingController.getAll)
router.get('/:ID_Booking',  bookingController.getOne)


module.exports = router