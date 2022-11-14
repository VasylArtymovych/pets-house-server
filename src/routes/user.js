const { Router } = require('express');
const { UserCtrl } = require('../controllers');
const { validateBody, validateToken, isValidId } = require('../middleware');
const { userSchema, petSchema } = require('../schema');

const router = Router();

router.get('/current', validateToken, UserCtrl.getUserData);

router.patch('/current', validateToken, validateBody(userSchema), UserCtrl.updateUserData);

router.post('/pets', validateToken, validateBody(petSchema), UserCtrl.addUserPet);

router.delete('/pets/:id', validateToken, isValidId, UserCtrl.deleteUserPet);

router.patch('/pets/:id', validateToken, isValidId, validateBody(petSchema), UserCtrl.updatePetData);

//add notices to favorites:
router.post('/favorites/:id', validateToken, isValidId, UserCtrl.addNoticeToFavorites);

router.get('/favorites/', validateToken, UserCtrl.getUserFavorites);

router.delete('/favorites/:id', validateToken, isValidId, UserCtrl.deleteNoticeFromFavorites);

module.exports = router;
