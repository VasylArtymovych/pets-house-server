const { NoticeModel } = require('../models');
const { CustomError } = require('../helpers');

class NoticeService {
  addPetToCategory = async (id, data) => {
    const { title, name, dateOfBirth, breed } = data;
    const pet = await NoticeModel.findOne({ title, name, dateOfBirth, breed });

    if (pet) {
      throw new CustomError(`Pet already exist.`, 400, 'Please check your posts.');
    }

    const newPet = await NoticeModel.create({ ...data, owner: id });
    if (!newPet) {
      throw new CustomError('Unable to save Pet to DB.');
    }

    return newPet;
  };
}

module.exports = new NoticeService();
