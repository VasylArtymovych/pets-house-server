const { UserModel } = require('../models');
const { CustomError } = require('../helpers');


class UserService {
  getUserData = async (id) => {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new CustomError('Unable to find User.');
    }
    return user;
  };

  updateUserData = async (id, data) => {
    const user = await UserModel.findByIdAndUpdate(id, { ...data }, { new: true });
    if (!user) {
      throw new CustomError('Unable to update User data.');
    }
    return user;
  };
  

  addUserPet = async () => {};


  deleteUserPet = async () => { };
  
}


module.exports = new UserService();