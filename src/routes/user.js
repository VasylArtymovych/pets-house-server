const { Router } = require('express');
const { UserCtrl } = require('../controllers');

const router = Router();
// в процессе
// створити ендпоінт для отримання:- особистої інформації про користувача, - інформації про тварин користувача
router.get('/current', UserCtrl.getUserData);
// router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

// створити ендпоінт для оновлення одного з полів контактної інформації про користувача
// router.patch('/current/:id', authenticate, UserCtrl.updateUserData);

// // створити ендпоінт для додавання карточки тварини користувача
// router.post('/pets', authenticate, UserCtrl.addUserPet);

// // створити ендпоінт для видалення карточки з твариною користувача
// router.delete('/pets/:id', authenticate, UserCtrl.deleteUserPet);






module.exports = router;
