const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs/promises');
const { UserService } = require('../services');
const { CustomError } = require('../helpers');

const avatarsDir = path.join(__dirname, '..', 'public', 'avatars');
const petImagesDir = path.join(__dirname, '..', 'public', 'petImages');

class UserController {
  constructor(avatarsDir, petImagesDir, noticeImagesDir) {
    this.avatarsDir = avatarsDir;
    this.petImagesDir = petImagesDir;
    this.noticeImagesDir = noticeImagesDir;
  }

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

  updateAvatar = asyncHandler(async (req, res) => {
    const { filename, path: tempDir } = req.file;
    const { id } = req.user;
    try {
      const resultUpload = path.join(this.avatarsDir, filename);
      await fs.rename(tempDir, resultUpload);

      const avatarUrl = path.join('avatars', filename);
      const user = await UserService.updateAvatar(id, avatarUrl);

      res.status(200).json({ code: 200, status: 'success', user });
    } catch (error) {
      await fs.unlink(tempDir);
      throw new CustomError('Unable to update avatar', 500, `${error.message}`);
    }
  });

  addUserPet = asyncHandler(async (req, res) => {
    const { id: owner } = req.user;
    const { name, dateOfBirth, breed, comments } = req.body;
    const { filename, path: tempDir } = req.file;

    if (!name || !dateOfBirth || !breed || !comments) {
      return res.status(400).json({ error: 'Missing required field', status: 'failed' });
    }

    const petImageUrl = await this.addPetImage(filename, tempDir);

    const pet = await UserService.addUserPet(owner, req.body, petImageUrl);

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

  updateUserPetImage = asyncHandler(async (req, res) => {
    const { filename, path: tempDir } = req.file;
    const { id } = req.user;
    try {
      const resultUpload = path.join(this.petImagesDir, filename);
      await fs.rename(tempDir, resultUpload);

      const petImgUrl = path.join('petImages', filename);
      const pet = await UserService.updateUserPetImage(id, petImgUrl);

      res.status(200).json({ code: 200, status: 'success', pet });
    } catch (error) {
      await fs.unlink(tempDir);
      throw new CustomError('Unable to update avatar', 500, `${error.message}`);
    }
  });

  getUserPets = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const pets = await UserService.getUserPets(id);

    res.status(200).json({ code: 200, status: 'success', pets });
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

  addPetImage = async (filename, tempDir) => {
    try {
      const petImage = path.join(this.petImagesDir, filename);
      await fs.rename(tempDir, petImage);

      const petImageUrl = path.join('petImages', filename);
      return petImageUrl;
    } catch (error) {
      await fs.unlink(tempDir);
      throw new CustomError('Unable to update pet image.', 500, `${error.message}`);
    }
  };
}

module.exports = new UserController(avatarsDir, petImagesDir);
