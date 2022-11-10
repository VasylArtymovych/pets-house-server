const asyncHandler = require('express-async-handler');

class AuthController {
  register = asyncHandler(async (req, res) => {
    res.json({ msg: 'register' });
  });

  login = asyncHandler(async (req, res) => {});

  logout = asyncHandler(async (req, res) => {});

  generateToken = () => {};
}

module.exports = new AuthController(asyncHandler);
