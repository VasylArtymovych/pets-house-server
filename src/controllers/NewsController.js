const asyncHandler = require('express-async-handler');
const { NewsService } = require('../services');

class NewsController {
  getAll = asyncHandler(async (req, res) => {
    let { page = 1, limit = 6, ...rest } = req.query;
    const skip = (page - 1) * limit;

    const result = await NewsService.getAll(skip, limit, rest);

    res.json({
      code: 200,
      status: 'success',
      total: result.length,
      result
    });
  });

  add = asyncHandler(async (req, res, next) => {
    const result = await NewsService.add(req.body);
    res.status(201).json(result);
  });
}

module.exports = new NewsController(asyncHandler);
