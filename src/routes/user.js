const { Router } = require('express');
const { UserCtrl } = require('../controllers');
const { validateBody, validateToken, isValidId } = require('../middleware');
const { userSchema, petSchema } = require('../schema');

const router = Router();
// в процессе
// створити ендпоінт для отримання:- особистої інформації про користувача, - інформації про тварин користувача
router.get('/current', validateToken, UserCtrl.getUserData);

router.patch('/current', validateToken, validateBody(userSchema), UserCtrl.updateUserData);

// // створити ендпоінт для додавання карточки тварини користувача
router.post('/pets', validateToken, validateBody(petSchema), UserCtrl.addUserPet);

// // створити ендпоінт для видалення карточки з твариною користувача
router.delete('/pets/:id', validateToken, isValidId, UserCtrl.deleteUserPet);

// router.patch('/pets/:id', validateToken, isValidId, validateBody(petSchema), UserCtrl.updatePetData);


module.exports = router;
