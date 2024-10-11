const express = require('express');
const {getAll} =  require('../controller/postController');
const router = express.Router();

router.get('/all', getAll);

module.exports = router;