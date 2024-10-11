const express = require('express');
const {getAllNotification, allNotificationRead, collaborationRead} = require('../controller/notificationController');
const router = express.Router();

router.get('/all', getAllNotification);
router.patch('/all-read', allNotificationRead);
router.patch('/collaboration-read', collaborationRead);

module.exports = router;