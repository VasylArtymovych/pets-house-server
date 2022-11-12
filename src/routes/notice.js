const { Router } = require('express');
const { NoticeCtrl } = require('../controllers');

const router = Router();

router.get('/:category', NoticeCtrl.getPetsByCategory);

module.exports = router;
