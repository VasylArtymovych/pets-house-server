const { Router } = require('express');
const { AuthCtrl } = require('../controllers');

const router = Router();

router.post('/register', AuthCtrl.register);

router.post('/login', AuthCtrl.login);

router.post('/logout', AuthCtrl.logout);

module.exports = router;
