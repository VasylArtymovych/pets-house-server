const { Router } = require('express');
const { NewsController } = require('../controllers');

const router = Router();

router.get('/', NewsController.getAllNews);

// router.post('/', NewsController.addNews);

module.exports = router;
