const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs/promises');
const { NoticeService } = require('../services');

const noticeImagesDir = path.join(__dirname, '..', 'public', 'noticeImages');

class NoticeController {
  constructor(noticeImagesDir) {
    this.noticeImagesDir = noticeImagesDir;
  }

  addNoticeToCategory = asyncHandler(async (req, res) => {
    const { id: owner } = req.user;
    const { title, sex, location, category } = req.body;
    const { filename, path: tempDir } = req.file;

    if (!title || !sex || !location || !category) {
      return res.status(400).json({ code: 400, status: 'failed', error: 'Missing required field.' });
    }
    const noticeImageUrl = await this.addNoticeImage(filename, tempDir);
    const notice = await NoticeService.addNoticeToCategory(owner, req.body, noticeImageUrl);

    res.status(201).json({ code: 201, status: 'created', notice });
  });

  getNoticesByCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.params;
    let { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * limit;
    limit = parseInt(limit) > 20 ? 20 : limit;

    const data = await NoticeService.getNoticesByCategory(categoryName, skip, limit);

    res.status(200).json({ code: 200, status: 'success', data, page, limit });
  });

  getNoticeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const notice = await NoticeService.getNoticeById(id);
    res.status(200).json({ code: 200, status: 'success', notice });
  });

  searchByNameInTitle = asyncHandler(async (req, res) => {
    const { name } = req.params;
    const notices = await NoticeService.searchByNameInTitle(name);
    res.status(200).json({ code: 200, status: 'success', notices });
  });

  addNoticeImage = async (filename, tempDir) => {
    try {
      const noticeImage = path.join(this.noticeImagesDir, filename);
      await fs.rename(tempDir, noticeImage);

      const noticeImageUrl = path.join('noticeImages', filename);
      return noticeImageUrl;
    } catch (error) {
      await fs.unlink(tempDir);
      throw new CustomError('Unable to update pet image.', 500, `${error.message}`);
    }
  };
}

module.exports = new NoticeController(noticeImagesDir);
