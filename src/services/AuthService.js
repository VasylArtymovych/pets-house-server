const bcrypt = require('bcryptjs');
const { UserModel } = require('../models');
const { CustomError } = require('../helpers');
class AuthService {
  register = async (body) => {
    const user = await UserModel.findOne({ email: body.email });
    if (user) {
      throw new CustomError(`User with email: ${body.email} already exist.`, 400, 'Please login.');
    }

    const hashPassword = bcrypt.hashSync(body.password, 10);
    if (!hashPassword) {
      throw new CustomError('Unable to hash password.');
    }

    const newUser = await UserModel.create({ ...body, password: hashPassword });
    if (!newUser) {
      throw new CustomError('Unable to save User to DB.');
    }

    newUser.password = '';
    return newUser;
  };

  login = () => {};

  logout = () => {};
}

module.exports = new AuthService();
