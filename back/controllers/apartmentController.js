const {Apartment} = require('../models/models')
const {ApartmentClass} = require('../models/models')
const ApiError = require('../errors/ApiError')

class ApartmentController {
    async create(req, res, next){
        try {
            let {Floor, Number_Of_Apartment, ID_Ref_Apart_Class, Description} = req.body
            const candidate = await Apartment.findOne({where: {Number_Of_Apartment}})
            if (candidate){
                return next(ApiError.badRequest('This Number of apartment is already used')) 
            }
            let numberOfApart = parseInt(Number_Of_Apartment) 
            const apartment = await Apartment.create({Floor, Number_Of_Apartment: numberOfApart, ID_Ref_Apart_Class, Description})
            return res.json(apartment)
        } catch (e) {
            return next(ApiError.internal(e.message)) 
        }
    }

    async updateApartment(req, res, next) {
        try {
            let {Floor, Number_Of_Apartment, ID_Ref_Apart_Class, Description} = req.body
            let {ID_Apart} = req.params
            let apart = await Apartment.findByPk(ID_Apart);
            if (!apart) return next(ApiError.badRequest('Apartment not found.'))
            await apart.update({
                Floor,
                Number_Of_Apartment,
                ID_Ref_Apart_Class,
                Description
            });
            return res.json(apart)
        } catch (e) {
            next(ApiError.badRequest(e.message)) 
        } 
    }

    async deleteApartment(req, res, next) {
        try {
            let {ID_Apart} = req.params
            let apart = await Apartment.findByPk(ID_Apart);
            if (!apart) {
              return next(ApiError.internal(`Apartment with id=${ID_Apart} not found.`));
            }
            await apart.destroy();
            let apartment = await Apartment.findByPk(ID_Apart);
            if(!apartment) return res.json('Deleted succesfully')
            return res.json('Apartment is not deleted')
        } catch (e) {
            next(ApiError.badRequest(e.message)) 
        }
        
    }  


    async getAll(req, res, next){
        try {
            const {ID_Ref_Apart_Class} = req.query
            let apartments;
            if (ID_Ref_Apart_Class){
                apartments = await Apartment.findAll({where: ID_Ref_Apart_Class})
            } else {
                apartments = await Apartment.findAll()
            } 
            return res.json(apartments)
        } catch (e) {
            next(ApiError.badRequest(e.message)) 
        }
    }

    async getOne(req, res, next){
      const {ID_Apart} = req.params
      const apartment = await Apartment.findByPk(ID_Apart);
      if (!apartment) {
        return next(ApiError.internal(`Apartment with id=${ID_Apart} not found.`))
      }
      return res.json(apartment)
    }

    async getName(req, res, next){
        const {ID_Apart} = req.params
        const apartment = await Apartment.findByPk(ID_Apart);
        if (!apartment) {
          return next(ApiError.internal(`Apartment with id=${ID_Apart} not found.`))
        }
        const typeName = await ApartmentClass.findByPk(apartment.ID_Ref_Apart_Class)
        if (!typeName) {
            return next(ApiError.internal(`ApartmentClass with id=${ID_Apart} not found.`))
        }
        return res.json(typeName)
      }
}

module.exports = new ApartmentController()