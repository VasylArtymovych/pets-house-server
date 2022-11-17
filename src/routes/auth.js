const { Router } = require('express');
const { AuthCtrl } = require('../controllers');
const { validateBody, validateToken } = require('../middleware');
const { userSchema } = require('../schema');

const router = Router();

router.post('/register', validateBody(userSchema), AuthCtrl.register);

router.post('/login', validateBody(userSchema), AuthCtrl.login);

router.get('/logout', validateToken, AuthCtrl.logout);

router.patch('/fogotPassword', validateBody(userSchema), AuthCtrl.fogotPassword);

module.exports = router;
