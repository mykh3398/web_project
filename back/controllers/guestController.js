const ApiError = require('../errors/ApiError')
const { Guest } = require('../models/models');


class GuestController {
    async createGuest(req, res, next){
        let { First_Name, Middle_Name, Last_Name,
            Passport_Number, Phone, Passport_Date, Gender, ID_Ref_User } = req.body;
        if (!Phone) {
          return next(ApiError.badRequest('Please enter all data correctly'))
        }
        let candidate = await Guest.findOne({where: {Passport_Number}})
        if (candidate) {
          return next(ApiError.badRequest('Guest already exists'))
        }
        const guest = await Guest.create({
            First_Name, Middle_Name, Last_Name,
            Passport_Number, Phone, Passport_Date, Gender, ID_Ref_User
        })
        return res.json({ guest })
    }

    async updateGuest(req, res) {
        const {  First_Name, Middle_Name, Last_Name,
            Passport_Number, Phone, Passport_Date, Gender} = req.body;
        const { ID_Guest } = req.params
        const guest = await Guest.findByPk(ID_Guest)
        if (!guest) {
          return next(ApiError.badRequest(`Guest with ID=${ID_Guest} is not found.`))
        }
        await guest.update({
          First_Name,
          Middle_Name,
          Last_Name,
          Phone,
          Passport_Number,
          Passport_Date,
          Gender
        });
        return res.json(guest)
    }

    async deleteGuest(req, res, next){
        let {ID_Guest} = req.params
        let guest = await Guest.findByPk(ID_Guest);
        if (!guest) {
          return res.status(404).json({ error: 'User not found.' });
        }
        await guest.destroy();
        let findGuest = await Guest.findByPk(ID_Guest);
        if(!findGuest){
          return res.json('Deleted succesfully')
        }
    }  


    async getOneGuest(req, res, next) {
      const { ID_Guest } = req.params;
      const guest = await Guest.findByPk(ID_Guest);
      if (!guest) {
        return next.ApiError.badRequest(`User with ID=${ID_Guest} is not found.`);
      }
      return res.json(guest);
    }

    async getAllGuests(req, res) {
      const guests = await Guest.findAll();
      return res.json(guests);
    }
}

module.exports = new GuestController()