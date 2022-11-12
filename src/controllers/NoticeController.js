const asyncHandler = require('express-async-handler');

class NoticeController {
  getPetsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    res.send(category);
  });
}

module.exports = new NoticeController();
