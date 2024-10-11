const express = require('express');
const {create, getMe, getByUserId, update, remove} = require('../controller/projectController');
const router = express.Router();

router.post('/create', create);
router.get('/me', getMe);
router.get('/user/:id', getByUserId);
router.patch('/update/:id', update);
router.delete('/:id', remove);

module.exports = router;