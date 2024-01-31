const { ApartmentClass } = require('../models/models')
const ApiError = require('../errors/ApiError')

class ApartmentClassController {
    async create(req, res, next) {
        try {
            let { Name, Number_Of_Rooms, Max_Number_Of_Guests, Price} = req.body
            const apartmentClass = await ApartmentClass.create({ Name, Number_Of_Rooms, Max_Number_Of_Guests, Price})
            return res.json(apartmentClass)
        } catch (e) {
            next(ApiError.badRequest(e.message)) 
        }
       
    }
    
    async update(req, res) {
        try {
            let { Name, Number_Of_Rooms, Max_Number_Of_Guests, Price} = req.body
            const {ID_Apart_Class} = req.params
            const apartmentClass = await ApartmentClass.findByPk(ID_Apart_Class)
            if(!apartmentClass){
                next(ApiError.badRequest(`ApartmentClass with id=${ID_Apart_Class} not found.`)) 
            }
            apartmentClass.Name = Name
            apartmentClass.Number_Of_Rooms = Number_Of_Rooms
            apartmentClass.Max_Number_Of_Guests = Max_Number_Of_Guests
            apartmentClass.Price = Price
            await apartmentClass.save()
            return res.json(apartmentClass)
        } catch (e) {
            next(ApiError.badRequest(e.message)) 
        }
        
    }

    async deleteApartClass(req, res, next) {
        try {
            let {ID_Apart_Class} = req.params
            let apartClass = await ApartmentClass.findByPk(ID_Apart_Class);
            if (!apartClass) {
              return next(ApiError.internal(`ApartmentClass with id=${ID_Apart_Class} not found.`));
            }
            await apartClass.destroy();
            let apartmentClass = await ApartmentClass.findByPk(ID_Apart_Class);
            if(!apartmentClass) return res.json('Deleted succesfully')
            return res.json('Apartment is not deleted')
        } catch (e) {
            next(ApiError.badRequest(e.message)) 
        }
        
    }  

    async getAll(req, res) {
        const classes = await ApartmentClass.findAll()
        return res.json(classes)
    }
    
}

module.exports = new ApartmentClassController()