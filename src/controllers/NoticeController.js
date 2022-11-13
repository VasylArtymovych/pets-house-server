const asyncHandler = require('express-async-handler');
const { NoticeService } = require('../services');

class NoticeController {
  addPetToCategory = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { title, sex, location, price } = req.body;

    if (!title || !sex || !location || !price) {
      return res.status(400).json({ code: 400, status: 'failed', error: 'Missing required field' });
    }

    const pet = await NoticeService.addPetToCategory(id, req.body);
    res.status(201).json({ code: 201, status: 'created', pet });
  });

  getPetsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    res.send(category);
  });
}

module.exports = new NoticeController();
