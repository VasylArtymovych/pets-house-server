const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
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

  login = async (email, password) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new CustomError(`User with email: ${email} not found.`, 400, 'Please provide valid email.');
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new CustomError('Invalid password', 400, 'Please provide valid password.');
    }

    const token = this.generateToken(user._id);
    user.token = token;
    await user.save();

    if (!user.token) {
      throw new CustomError('Unable to save token.');
    }

    return token;
  };

  logout = async (id) => {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new CustomError(`Unable to logout.`, 400, 'Please try again.');
    }

    user.token = null;
    await user.save();

    if (user.token) {
      throw new CustomError(`Unable to update token in DB.`);
    }

    return true;
  };

  validateToken = async (id, token) => {
    const user = await UserModel.findById(id);
    if (user.token !== token) {
      return false;
    }
    return true;
  };

  generateToken = (id) => {
    const payload = { id };
    return Jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  };
}

module.exports = new AuthService();
