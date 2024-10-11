const express = require('express');
const passport = require('passport');
const {register, emailLogin, updateUser} = require('../controller/authController');
const router = express.Router();

router.post('/register', register);
router.post('/email-login', emailLogin);

module.exports = router;