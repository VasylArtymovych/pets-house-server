const { UserModel, PetModel, NoticeModel } = require('../models');
const { CustomError } = require('../helpers');

class UserService {
  getUserData = async (id) => {
    const user = await UserModel.findById(id, { password: 0 }).populate('pets');
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

  addUserPet = async (owner, data) => {
    const { name, dateOfBirth, breed } = data;
    const pet = await PetModel.findOne({ name, dateOfBirth, breed });

    if (pet) {
      throw new CustomError(`Pet already exist.`, 400, 'Please check your posts.');
    }

    const newPet = await PetModel.create({ ...data, owner });
    if (!newPet) {
      throw new CustomError('Unable to create new Pet data.');
    }

    await UserModel.updateOne({ _id: owner }, { $push: { pets: newPet._id } });

    return newPet;
  };

  deleteUserPet = async (id) => {
    const deletedPet = await PetModel.findByIdAndRemove(id);
    if (!deletedPet) {
      throw new CustomError('Unable to delete Pet.');
    }

    await UserModel.updateOne({ _id: deletedPet.owner }, { $pull: { pets: { $in: [deletedPet._id] } } });

    return true;
  };

  updateUserPetData = async (id, data) => {
    const pet = await PetModel.findByIdAndUpdate(id, { ...data }, { new: true });
    if (!pet) {
      throw new CustomError('Unable to update Pet data.');
    }
    return pet;
  };

  addNoticeToFavorites = async (userId, noticeId) => {
    const user = await UserModel.updateOne({ _id: userId }, { $push: { favorites: noticeId } });
    if (!user) {
      throw new CustomError('Unable to add notice to favorites.');
    }

    return true;
  };

  getUserFavorites = async (id) => {
    const user = await UserModel.findById(id).populate('favorites');
    if (!user) {
      throw new CustomError('Unable to get favorites.');
    }

    return user.favorites;
  };

  deleteNoticeFromFavorites = async (userId, noticeId) => {
    const user = await UserModel.updateOne({ _id: userId }, { $pull: { favorites: noticeId } });
    if (!user) {
      throw new CustomError('Unable to delete notice from favorites.');
    }

    return true;
  };

  getUserNotices = async (id) => {
    const user = await UserModel.findById(id).populate('notices');
    if (!user) {
      throw new CustomError('Unable to get notices.');
    }

    return user.notices;
  };

  deleteUserNotice = async (userId, noticeId) => {
    const deletedNotice = await NoticeModel.findOneAndDelete({ _id: noticeId });
    if (!deletedNotice) {
      throw new CustomError('Unable to delete notice.');
    }

    const user = await UserModel.updateOne({ _id: userId }, { $pull: { notices: noticeId } });
    if (!user) {
      throw new CustomError('Unable to delete notice.');
    }

    return true;
  };
}

module.exports = new UserService();
