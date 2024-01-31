const User = require('../models/models');
//npm install express-session

class UserService {
    async addUser(userData) {
        try {
          const existingUser = await User.findOne(userData.ID_User)
          if (existingUser) {
            throw new Error('Користувач з цією електронною поштою вже існує.');
          }
          const newUser = await User.create(userData);
          return res.json(newUser);
        } catch (error) {
          throw error;
        }
    }

    static async loginUser(email, password) {
        try {
          const user = await User.findOne({
            where: { email: email },
          });
          if (!user) {
            throw new Error('Користувача з такою електронною поштою не знайдено.');
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error('Неправильний пароль.');
          }
          return user;
        } catch (error) {
          throw error;
        }
    }

  async logoutUser(refreshToken) {
      const token = await tokenService.removeToken(refreshToken);
      return token;
  }

    async check(req, res) {
      
    }

    static async updateUser(userId, updatedUserData) {
        try {
          const user = await User.findByPk(userId); //findByPk - Sequelize method
          if (!user) {
            throw new Error('Користувач не знайдений.');
          }
          await user.update(updatedUserData);
          return user;
        } catch (error) {
          throw error;
        }
    }

    static async getOneUser(userId) {
        try {
          const user = await User.findByPk(userId);
          if (!user) {
            throw new Error('User not found.');
          }
          return user;
        } catch (error) {
          throw error;
        }
    }

    static async getAllUsers() {

    }
}

module.exports = new UserService()