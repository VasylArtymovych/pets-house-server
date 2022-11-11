const { Router } = require('express');
const { UserCtrl } = require('../controllers');

const router = Router();
// в процессе

router.get('/:id', UserCtrl.getUserData);

router.post('/:id', UserCtrl.updateUserData);

router.post('/', UserCtrl.addUserPet);

router.post('/', UserCtrl.deleteUserPet);

module.exports = router;
