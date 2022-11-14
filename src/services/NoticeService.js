const { NoticeModel } = require('../models');
const { CustomError } = require('../helpers');

class NoticeService {
  addNoticeToCategory = async (id, data) => {
    const { title, name, dateOfBirth, breed } = data;
    const notice = await NoticeModel.findOne({ title, name, dateOfBirth, breed });

    if (notice) {
      throw new CustomError(`Notice already exist.`, 400, 'Please check your posts.');
    }

    const newNotice = await NoticeModel.create({ ...data, owner: id });
    if (!newNotice) {
      throw new CustomError('Unable to save Notice to DB.');
    }

    return newNotice;
  };
  

  // add pagination in future!
  getNoticesByCategory = async (category) => {
    const data = await NoticeModel.find({ category });

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