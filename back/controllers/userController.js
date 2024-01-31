const ApiError = require('../errors/ApiError')
const { User } = require('../models/models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (ID_User, Email, ID_Ref_Role, expiresIn = '24h') => {
  return jwt.sign(
    { ID_User, Email, ID_Ref_Role },
    process.env.SECRET_KEY,
    { expiresIn }
  );
};


class UserController {

  async registration(req, res, next) {
    let { First_Name, Middle_Name, Last_Name,
      Email, Password, Phone, Credit_Card_Number, Blood_Type, Birthday, Gender, ID_Ref_Role } = req.body;
    if (!Email || !Password) {
      return next(ApiError.badRequest('Invalid email or password'))
    }
    let candidate = await User.findOne({ where: { Email } })
    if (candidate || Email === process.env.ADMIN_EMAIL) {
      return next(ApiError.badRequest('Email is already taken'))
    }

    const user = await User.create({
      First_Name, Middle_Name, Last_Name,
      Email, Phone, Credit_Card_Number, Blood_Type, Birthday, Gender, ID_Ref_Role, Password
    })
    return res.json({ user })
  }


  async login(req, res, next) {
    const { Email, Password } = req.body;
    if (Email === process.env.ADMIN_EMAIL) {
      const { token } = await UserController.adminLogin(Password);
      if ({ token }) return res.json({ token });
    }
    const user = await User.findOne({ where: { Email } })
    if (!user) return next(ApiError.internal('User not found'))

    if (Password !== user.Password) {
      return next(ApiError.internal('Invalid password'));
    }

    const token = generateJwt(user.ID_User, user.Email, user.ID_Ref_Role)
    return res.json({ token })
  }


  static async adminLogin(Password) {
    let admin;
    if (Password === process.env.ADMIN_PASSWORD) {
      admin = await User.findOne({ where: { ID_Ref_Role: 1 } })
    }
    if (!admin) {
      admin = await User.create({
        First_Name: 'of an', Middle_Name: 'api', Last_Name: 'admin',
        Email: process.env.ADMIN_EMAIL, Password: process.env.ADMIN_PASSWORD, Phone: '0000000',
        Credit_Card_Number: '1111111111111111', Blood_Type: 'O(I)',
        Birthday: '2000/01/01', Gender: 1.2, ID_Ref_Role: 1
      })
    }
    const token = generateJwt(admin.ID_User, admin.Email, admin.ID_Ref_Role)
    return { token };
  }


  async logout(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const expiredToken = await generateJwt(null, null, null, 1);
      if (!expiredToken) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.json({ message: "Logged out successfully", expiredToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }


  async updateUser(req, res) {
    const { First_Name, Middle_Name, Last_Name,
      Email, Password, Phone, Credit_Card_Number, Blood_Type, Birthday, Gender, ID_Ref_Role } = req.body;
    const { ID_User } = req.params
    const user = await User.findByPk(ID_User)
    if (!user) {
      return next(ApiError.badRequest(`User with ID=${ID_User} is not found.`))
    }
    //const hashPassword = await bcrypt.hash(Password, 7)
    await user.update({
      First_Name,
      Middle_Name,
      Last_Name,
      Phone,
      Email,
      Credit_Card_Number,
      Blood_Type,
      Birthday,
      Gender
    });
    return res.json(user)
  }

  async deleteUser(req, res, next) {
    let { ID_User } = req.params
    let user = await User.findByPk(ID_User);
    if (!user) {
      return next(ApiError.badRequest(`User with ID=${ID_User} is not found.`))
    }
    await user.destroy();
    let findUser = await User.findByPk(ID_User);
    if (!findUser) {
      return res.json('Deleted succesfully')
    }
  }

  async deleteAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      if (users.length === 0) {
        return res.json('No users to delete');
      }
      await User.destroy({ where: {} });
      res.json('All users deleted');
    } catch (error) {
      return next(error);
    }
  }

  async getOneUser(req, res, next) {
    const { ID_User } = req.params;
    const user = await User.findByPk(ID_User);
    if (!user) {
      return next(ApiError.badRequest(`User with ID=${ID_User} is not found.`))
    }
    return res.json(user);
  }


  async getAllUsers(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }
}

module.exports = new UserController()