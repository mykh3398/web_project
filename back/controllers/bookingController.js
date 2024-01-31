const { BookingUser, BookingGuest, Apartment } = require('../models/models')
const ApiError = require('../errors/ApiError')

class BookingController {
  async createBooking(req, res, next) {
    try {
      let { ID_Ref_User, ID_Ref_Apart, Start_Date,
        End_Date, Confirmed_Booking, Is_Paid } = req.body
      const booking = await BookingUser.create({
        ID_Ref_User, ID_Ref_Apart, Start_Date, End_Date,
        Confirmed_Booking, Is_Paid
      })
      return res.json(booking)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async createGuestBooking(req, res, next) {
    try {
      let { ID_Ref_Guest, ID_Ref_Apart, Start_Date,
        End_Date, Confirmed_Booking, Is_Paid } = req.body
      const booking = await BookingGuest.create({
        ID_Ref_Guest, ID_Ref_Apart, Start_Date, End_Date,
        Confirmed_Booking, Is_Paid
      })
      return res.json(booking)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }


  /*
      async updateBooking(req, res){
          try {
              let {ID_Ref_User, ID_Ref_Apart, Start_Date, 
                  End_Date, Confirmed_Booking, Is_Paid,
                  ID_Ref_Guest} = req.body
              let {ID_Booking} = req.params
              const booking = await Booking.findByPk(ID_Booking)
              if (!booking) return next(ApiError.badRequest(`Booking with id=${ID_Booking} not found.`))
              booking.ID_Ref_User = ID_Ref_User 
              booking.ID_Ref_Apart = ID_Ref_Apart
              booking.Start_Date = Start_Date
              booking.End_Date = End_Date 
              booking.Confirmed_Booking = Confirmed_Booking
              booking.Is_Paid = Is_Paid
              booking.ID_Ref_Guest = ID_Ref_Guest
              await booking.save();
              return res.json(booking)
          } catch (e) {
              next(ApiError.badRequest(e.message)) 
          }
      }
  */

  async deleteBooking(req, res, next) {
    try {
      let { ID_Booking } = req.params
      let booking = await BookingUser.findByPk(ID_Booking);
      if (!booking) {
        return next(ApiError.badRequest(`Booking with ID=${ID_Booking} is not found.`))
      }
      await booking.destroy();
      let findBooking = await BookingUser.findByPk(ID_Booking);
      if (!findBooking) {
        return res.json('Deleted succesfully')
      }
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async deleteBookingGuest(req, res) {
    try {
      let { ID_Booking } = req.params
      let booking = await BookingGuest.findByPk(ID_Booking);
      if (!booking) {
        return next(ApiError.badRequest(`Booking with ID=${ID_Booking} is not found.`))
      }
      await booking.destroy();
      let findBooking = await BookingGuest.findByPk(ID_Booking);
      if (!findBooking) {
        return res.json('Deleted succesfully')
      }
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async deleteAllBookings(req, res, next) {
    try {
      const bookingsU = await BookingUser.findAll();
      if (bookingsU.length === 0) {
        return res.json('No BookingUsers to delete');
      }
      let bookingsG = await BookingGuest.findAll()
      if (bookingsG.length === 0) {
        return res.json('No BookingGuests to delete');
      }
      await BookingUser.destroy({ where: {} });
      await BookingGuest.destroy({ where: {} });
      let findBookingU = await BookingUser.findOne();
      let findBookingG = await BookingGuest.findOne();
      if (!findBookingU && !findBookingG) {
        return res.json('All Bookings deleted succesfully')
      }
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const [bookings, bookingsGuests] = await Promise.all([
        BookingUser.findAll(),
        BookingGuest.findAll(),
      ]);
      const allBookings = [...bookings, ...bookingsGuests];
      return res.json(allBookings);
    } catch (error) {
      return next(error);
    }
  }


  async getOne(req, res, next) {
    const { ID_Booking } = req.params
    const booking = await BookingUser.findByPk(ID_Booking);
    if (!booking) {
      return next(ApiError.internal(`Apartment with id=${ID_Booking} not found.`))
    }
    return res.json(booking)
  }

  async getAllFreeRooms(req, res, next) {
    try {
      const bookingsU = await BookingUser.findAll();
      const bookingsG = await BookingGuest.findAll();
      const bookings = [...bookingsU, ...bookingsG];
      if (bookings) {
        const bookedRoomsIds = bookings.map(booking => booking.ID_Ref_Apart);
        const allRooms = await Apartment.findAll();
        const freeRooms = allRooms.filter(room => !bookedRoomsIds.includes(room.ID_Apart));
        if (freeRooms) return res.json(freeRooms);
      } else {
        const allRooms = await Apartment.findAll();
        return res.json(allRooms);
      }
      return res.json('Sorry, there are no available rooms');
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async getAllBookedRooms(req, res, next) {
    try {
      const bookings = await BookingUser.findAll();
      if (bookings) {
        const bookedRoomsIds = bookings.map(booking => booking.ID_Ref_Apart);
        const bookedRooms = await Apartment.findAll({
          where: {
            ID_Apart: bookedRoomsIds
          }
        });

        if (bookedRooms) {
          return res.json(bookedRooms);
        }
      }
      return res.json('Sorry, there are no booked rooms');
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }



}

module.exports = new BookingController()