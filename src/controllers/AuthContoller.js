const asyncHandler = require('express-async-handler');
const { AuthService } = require('../services');

class AuthController {
  register = asyncHandler(async (req, res) => {
    const { email, password, city, phone } = req.body;

    if (!email || !password || !city || !phone) {
      return res.status(400).json({ error: 'Missing required field', status: 'failed' });
    }
    const user = await AuthService.register(req.body);
    res.status(201).json({ status: 'created', user });
  });

  login = asyncHandler(async (req, res) => {});

  logout = asyncHandler(async (req, res) => {});

  generateToken = () => {};
}

module.exports = new AuthController(asyncHandler);
