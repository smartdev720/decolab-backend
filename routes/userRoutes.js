const express = require('express');
const multer = require('multer');
const path = require('path');
const {getUserById, getUserList, getMe, uploadAvatar, deleteAvatar, updateMe, uploadTeamAvatar, deleteTeamAvatar, addTeamMember} = require('../controller/userController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

// users
router.get('/others/:id', getUserById);
router.get('/list', getUserList);

// me
router.get('/me', getMe);
router.post('/upload-avatar', upload.single('logo'), uploadAvatar);
router.patch('/me', updateMe);
router.delete('/delete-avatar/:filename', deleteAvatar);


// Team Member
router.post('/me/team-member', addTeamMember);
router.post('/upload-team-avatar', upload.single('team'), uploadTeamAvatar);
router.delete('/delete-team-avatar/:filename', deleteTeamAvatar);

module.exports = router;