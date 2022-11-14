const asyncHandler = require('express-async-handler');
const { NewsService } = require('../services');

class NewsController {
  // getAllNews = asyncHandler(async (req, res) => {
  //   let { page = 1, limit = 6, ...rest } = req.query;
  //   const skip = (page - 1) * limit;

  //   const result = await NewsService.getAllNews(skip, limit, rest);

  //   res.json({code: 200, status: 'success', total: result.length, result
  //   });
  // });

  getAllNews = async (req, res) => {
    const data = await NewsService.getAllNews();

    res.status(200).json({ code: 200, status: 'success', data });

  }


  // addNews = asyncHandler(async (req, res, next) => {

  //   const result = await NewsService.addNews(req.body);

  //   res.status(201).json(result);
  // });
}

module.exports = new NewsController(asyncHandler);
