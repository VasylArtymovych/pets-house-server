const asyncHandler = require('express-async-handler');
const NewsModel = require('../models/NewsModel');

class NewsController {
  getAll = asyncHandler(async (req, res) => {
    const { page = 1, limit = 6, ...query } = req.query;
    const skip = (page - 1) * limit;
    const result = await NewsModel.find({ ...query }, '-createdAt -updatedAt ', {
      skip,
      limit
    });
    // const result = await NewsModel.find();
    res.json({
      code: 200,
      status: 'success',
      total: result.length,
      result
    });
  });

  add = asyncHandler(async (req, res, next) => {
    const result = await NewsModel.create(req.body);
    res.status(201).json(result);
  });
}

module.exports = new NewsController(asyncHandler);
