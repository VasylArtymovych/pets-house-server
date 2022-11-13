const asyncHandler = require('express-async-handler');

class NoticeController {
  addPetToCategory = asyncHandler(async (req, res) => {
    res.send(req.body);
  });

  getPetsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    res.send(category);
  });
}

module.exports = new NoticeController();
