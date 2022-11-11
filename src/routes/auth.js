const { Router } = require('express');
const { AuthCtrl } = require('../controllers');
const { validateBody } = require('../middleware');
const { userSchema } = require('../schema');

const router = Router();

router.post('/register', validateBody(userSchema), AuthCtrl.register);

router.post('/login', AuthCtrl.login);

router.post('/logout', AuthCtrl.logout);

module.exports = router;
