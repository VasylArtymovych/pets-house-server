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
  // add pagination in future!
  getPetsByCategory = async (category) => {
    const data = await NoticeModel.find({ category });

    if (!data) {
      throw new CustomError('Unable to get data from DB.');
    }

    return data;
  };

  getPetById = async (id) => {
    const pet = await NoticeModel.findById(id, { createdAt: 0, updatedAt: 0 });

    if (!pet) {
      throw new CustomError(`Pet with id: ${id} not found.`, 400, 'Provide valid id.');
    }

    return pet;
  };
}

module.exports = new NoticeService();
