const { NoticeModel, UserModel } = require('../models');
const { CustomError } = require('../helpers');


class NoticeService {

  addNoticeToCategory = async (owner, data) => {
    const { title, name, dateOfBirth, breed } = data;
    const notice = await NoticeModel.findOne({ title, name, dateOfBirth, breed });

    if (notice) {
      throw new CustomError(`Notice already exist.`, 400, 'Please check your posts.');
    }

    const newNotice = await NoticeModel.create({ ...data, owner });
    if (!newNotice) {
      throw new CustomError('Unable to create new Notice data.');
    }

    await UserModel.updateOne({ _id: owner }, { $push: { notices: newNotice._id } });

    return newNotice;
  };


  getNoticesByCategory = async (category, skip, limit) => {
    const data = await NoticeModel.find({ category }, { createdAt: 0, updatedAt: 0 }, { skip, limit });

    if (!data) {
      throw new CustomError('Unable to get data from DB.');
    }

    return data;
  };


  getNoticeById = async (id) => {
    const notice = await NoticeModel.findById(id, { createdAt: 0, updatedAt: 0 });

    if (!notice) {
      throw new CustomError(`Notice with id: ${id} not found.`, 400, 'Provide valid id.');
    }

    return notice;
  };

}

module.exports = new NoticeService();
