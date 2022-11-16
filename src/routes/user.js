const { Router } = require('express');
const { UserCtrl } = require('../controllers');
const { validateBody, validateToken, isValidId, uploadFiles } = require('../middleware');
const { userSchema, petSchema } = require('../schema');

const router = Router();

router.get('/current', validateToken, UserCtrl.getUserData);

router.patch('/current', validateToken, validateBody(userSchema), UserCtrl.updateUserData);

router.patch('/current/avatar', validateToken, uploadFiles.single('avatar'), UserCtrl.updateAvatar);

router.post('/pets', validateToken, validateBody(petSchema), uploadFiles.single('petImage'), UserCtrl.addUserPet);

router.delete('/pets/:id', validateToken, isValidId, UserCtrl.deleteUserPet);

router.patch('/pets/:id', validateToken, isValidId, validateBody(petSchema), UserCtrl.updateUserPetData);

router.post('/favorites/:id', validateToken, isValidId, UserCtrl.addNoticeToFavorites);

router.get('/favorites', validateToken, UserCtrl.getUserFavorites);

router.delete('/favorites/:id', validateToken, isValidId, UserCtrl.deleteNoticeFromFavorites);

router.get('/notices', validateToken, UserCtrl.getUserNotices);

router.delete('/notices/:id', validateToken, isValidId, UserCtrl.deleteUserNotice);

module.exports = router;
