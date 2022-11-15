const asyncHandler = require('express-async-handler');
const { AuthService } = require('../services');


class AuthController {

  register = asyncHandler(async (req, res) => {
    const { email, password, city, phone } = req.body;

    if (!email || !password || !city || !phone) {
      return res.status(400).json({ code: 400, status: 'failed', error: 'Missing required field' });
    }
    const user = await AuthService.register(req.body);
    res.status(201).json({ code: 201, status: 'created', user });
  });


  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ code: 400, status: 'failed', error: 'Missing required field' });
    }

    const user = await AuthService.login(email, password);
    res.status(200).json({ code: 200, status: 'success', user });
  });

  
  logout = asyncHandler(async (req, res) => {
    const { id } = req.user;
    await AuthService.logout(id);

    res.status(200).json({ code: 200, status: 'success', message: 'Logout success.' });
  });

}

module.exports = new AuthController();
