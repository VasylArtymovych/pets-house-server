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
    res.json({ msg: 'addUserPet' });
  });


  deleteUserPet = asyncHandler(async (req, res) => {
    res.json({ msg: 'deleteUserPet' });
  });
}


module.exports = new UserController();