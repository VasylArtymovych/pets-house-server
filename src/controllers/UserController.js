const asyncHandler = require('express-async-handler');
const { UserService } = require('../services');


class UserController {

  getUserData = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const user = await UserService.getUserData(id);

    res.status(200).json({ code: 200, status: 'success', user });
  });


  updateUserData = asyncHandler(async (req, res) => {
    const { id } = req.user;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ code: 400, status: 'failed', message: 'Provide data to update.' });
    }
    if (req.body.password) {
      return res.status(400).json({ code: 400, status: 'failed', message: 'Password is protected field.' });
    }
    const user = await UserService.updateUserData(id, req.body);

    res.status(200).json({ code: 200, status: 'success', user });
  });


  addUserPet = asyncHandler(async (req, res) => {
    const { id: owner } = req.user;
    const { name, dateOfBirth, breed, comments } = req.body;

    if (!name || !dateOfBirth || !breed || !comments) {
      return res.status(400).json({ error: 'Missing required field', status: 'failed' });
    }

    const pet = await UserService.addUserPet(owner, req.body);

    res.status(200).json({ code: 200, status: 'success', pet });
  });


  deleteUserPet = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await UserService.deleteUserPet(id);

    res.status(200).json({ code: 200, status: 'success', message: 'Pet was deleted' });
  });


  updateUserPetData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ code: 400, status: 'failed', message: 'Provide data to update.' });
    }
    const pet = await UserService.updateUserPetData(id, req.body);

    res.status(200).json({ code: 200, status: 'success', pet });
  });


  addNoticeToFavorites = asyncHandler(async (req, res) => {
    const { id: noticeId } = req.params;
    const { id: userId } = req.user;
    await UserService.addNoticeToFavorites(userId, noticeId);

    res.status(200).json({ code: 200, status: 'success', message: 'Notice was added to Favorite.' });
  });


  getUserFavorites = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const favorites = await UserService.getUserFavorites(id);

    res.status(200).json({ code: 200, status: 'success', favorites });
  });


  deleteNoticeFromFavorites = asyncHandler(async (req, res) => {
    const { id: noticeId } = req.params;
    const { id: userId } = req.user;
    await UserService.deleteNoticeFromFavorites(userId, noticeId);

    res.status(200).json({ code: 200, status: 'success', message: 'Notice was deleted from Favorite.' });
  });


  getUserNotices = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const notices = await UserService.getUserNotices(id);

    res.status(200).json({ code: 200, status: 'success', notices });
  });


  deleteUserNotice = asyncHandler(async (req, res) => {
    const { id: noticeId } = req.params;
    const { id: userId } = req.user;
    await UserService.deleteUserNotice(userId, noticeId);

    res.status(200).json({ code: 200, status: 'success', message: 'Notice was deleted.' });
  });

}

module.exports = new UserController();
