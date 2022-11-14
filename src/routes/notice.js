const { Router } = require('express');
const { NoticeCtrl } = require('../controllers');
const { validateBody, validateToken, isValidId } = require('../middleware');
const { petSchema } = require('../schema');

const router = Router();

router.post('/add', validateToken, validateBody(petSchema), NoticeCtrl.addNoticeToCategory);

router.get('/category/:categoryName', NoticeCtrl.getNoticesByCategory);

router.get('/:id', isValidId, NoticeCtrl.getNoticeById);


module.exports = router;
