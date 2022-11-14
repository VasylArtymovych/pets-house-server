const asyncHandler = require('express-async-handler');
const { NoticeService } = require('../services');

class NoticeController {
  // task 17
  addNoticeToCategory = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { title, sex, location, price } = req.body;

    if (!title || !sex || !location || !price) {
      return res.status(400).json({ code: 400, status: 'failed', error: 'Missing required field' });
    }

    const notice = await NoticeService.addNoticeToCategory(id, req.body);

    res.status(201).json({ code: 201, status: 'created', notice });
  });

  // task 12
  getNoticesByCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.params;

    const data = await NoticeService.getNoticesByCategory(categoryName);
    
    res.status(200).json({ code: 200, status: 'success', data });
  });

  // task 13
  getNoticeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const notice = await NoticeService.getNoticeById(id);
    res.status(200).json({ code: 200, status: 'success', notice });
  });
}

module.exports = new NoticeController();
