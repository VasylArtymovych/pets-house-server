const { Router } = require('express');
const { NoticeCtrl } = require('../controllers');
const { validateBody, validateToken } = require('../middleware');

const router = Router();

router.post('/add', validateToken, NoticeCtrl.addPetToCategory);
router.get('/:category', NoticeCtrl.getPetsByCategory);

module.exports = router;
