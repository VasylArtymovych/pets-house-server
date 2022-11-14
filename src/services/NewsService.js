const { NewsModel } = require('../models');
const { CustomError } = require('../helpers');

class NewsService {
  // Natali
  // getAllNews = async (skip, limit, rest) => {
  //   const result = await NewsModel.find({ skip, limit, ...rest }, '-createdAt -updatedAt', {
  //     skip,
  //     limit
  //   });
  //   if (!result) {
  //     throw new CustomError('Unable to get news');
  //   }
  //   return result;
  // };

  getAllNews = async (req, res) => {
    const data = await NewsModel.find();

    if (!data) {
      throw new CustomError('Unable to get News from DB.');
    }

    return data;
  }

  // addNews = async (body) => {
  //   const result = await NewsModel.create({ ...body });
  //   if (!result) {
  //     throw new CustomError('Unable to create news');
  //   }
  //   return result;
  // };
}

module.exports = new NewsService();
