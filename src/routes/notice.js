const { Router } = require('express');
const { NoticeCtrl } = require('../controllers');
const { validateBody, validateToken } = require('../middleware');
const { petSchema } = require('../schema');

const router = Router();

router.post('/add', validateToken, validateBody(petSchema), NoticeCtrl.addPetToCategory);
router.get('/:category', NoticeCtrl.getPetsByCategory);
router.get('/:id', NoticeCtrl.getPetsById);

module.exports = router;
