const { NewsModel } = require('../models');
const { CustomError } = require('../helpers');

class NewsService {
  getAll = async (skip, limit, rest) => {
    const result = await NewsModel.find({ skip, limit, ...rest }, '-createdAt -updatedAt', {
      skip,
      limit
    });
    if (!result) {
      throw new CustomError('Unable to get news');
    }
    return result;
  };
}

module.exports = new NewsService();
