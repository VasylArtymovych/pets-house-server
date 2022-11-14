const { Router } = require('express');
const { NoticeCtrl } = require('../controllers');
const { validateBody, validateToken, isValidId } = require('../middleware');
const { petSchema } = require('../schema');

const router = Router();

router.post('/add', validateToken, validateBody(petSchema), NoticeCtrl.addPetToCategory);
router.get('/category/:categoryName', NoticeCtrl.getPetsByCategory);
router.get('/:id', isValidId, NoticeCtrl.getPetById);

module.exports = router;
