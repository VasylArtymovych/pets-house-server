const asyncHandler = require('express-async-handler');
const { UserService } = require('../services');

class UserController {
  // надо будет еще дополнить pets через populate
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

  addPetToFavorites = asyncHandler(async (req, res) => {
    const { id: petId } = req.params;
    const { id: userId } = req.user;
    await UserService.addPetToFavorites(userId, petId);

    res.status(200).json({ code: 200, status: 'success', message: 'Pet was added to Favorite.' });
  });

  getUserFavorites = asyncHandler(async (req, res) => {});

  deletePetFromFavorites = asyncHandler(async (req, res) => {
    const { id: petId } = req.params;
    const { id: userId } = req.user;
    await UserService.deletePetFromFavorites(userId, petId);

    res.status(200).json({ code: 200, status: 'success', message: 'Pet was deleted from Favorite.' });
  });
}

module.exports = new UserController();
