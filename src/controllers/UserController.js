const asyncHandler = require('express-async-handler');

class UserController {
  getUserData = asyncHandler(async (req, res) => {
    res.json({ msg: 'getUserData' });
  });

  updateUserData = asyncHandler(async (req, res) => {
    res.json({ msg: 'updateUserData' })
  });

  addUserPet = asyncHandler(async (req, res) => {
    res.json({ msg: 'addUserPet' })
  });
  
  deleteUserPet = asyncHandler(async (req, res) => {
    res.json({ msg: 'deleteUserPet' })
  });
    
}

module.exports = new UserController(asyncHandler);
