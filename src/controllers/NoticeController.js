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
    const { categoryName } = req.params;
    const data = await NoticeService.getPetsByCategory(categoryName);
    res.status(200).json({ code: 200, status: 'success', data });
  });

  getPetById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pet = await NoticeService.getPetById(id);
    res.status(200).json({ code: 200, status: 'success', pet });
  });
}

module.exports = new NoticeController();
