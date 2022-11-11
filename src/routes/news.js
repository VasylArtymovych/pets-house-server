const { Router } = require('express');
const { NewsController } = require('../controllers');

const router = Router();

router.get('/', NewsController.getAll);
router.post('/', NewsController.add);

module.exports = router;
