const asyncHandler = require('express-async-handler');
const { NewsService } = require('../services');


class NewsController {
  
  getAllNews = async (_, res) => {
    const result = await NewsService.getAllNews();

    res.status(200).json(result);       
  }

}


module.exports = new NewsController(asyncHandler);