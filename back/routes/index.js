const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const bookingRouter = require('./bookingRouter')
const guestRouter = require('./guestRouter')
const apartmentRouter = require('./apartmentRouter')
const apartmentClassRouter = require('./apartmentClassRouter')
//const adminRouter = require('./adminRouter')

router.use('/', userRouter)
router.use('/booking', bookingRouter)
router.use('/guests', guestRouter)
router.use('/apartments', apartmentRouter)
router.use('/apartmentClass', apartmentClassRouter)

module.exports = router