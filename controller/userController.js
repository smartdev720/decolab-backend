const User = require('../models/user');
const fs = require('fs');
const path = require('path');

exports.getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) {
            return res.json({ok: false, message: "User not found"});
        }
        return res.status(200).json({ok: true, user});
    }catch(error) {
        return res.status(500).json({ok: false, message: "Server error"});
    }
}

exports.getUserList = async (req, res) => {
    try {
        const users = await User.find();
        const userList = users
            .filter(user => user._id.toString() !== req.user.id)
            .map(user => ({
                _id: user._id,
                name: user.name,
                logo: user.profile.additionalInfo.logo,
                tag: user.profile.industry[0],
            }));
        return res.status(200).json({ok: true, companies: userList});
    }catch (err) {
        return res.status(500).json({ok: false, message: "Server error"});
    }
}

exports.getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user) {
            return res.json({ok: false, message: "User not found"});
        }
        return res.status(200).json({ok: true, user});
    }catch(error) {
        return res.status(500).json({ok: false, message: "Server error"});
    }
}


exports.updateMe = async (req, res) => {
    const userId = req.user.id;
    try {
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {new: true, runValidators: true});
        if(!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.json({ok: true, user: updatedUser});
    }catch(err) {
        return res.status(500).json({message: 'Server error', error});
    }
}

exports.uploadAvatar = async (req, res) => {
    try {
        const userId = req.user.id;
        const logoUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        const updatedUser = await User.findByIdAndUpdate(userId, {'profile.additionalInfo.logo': logoUrl});
        if(updatedUser) {
            return res.status(200).json({ok: true, logoUrl});
        }
    }catch(error) {
        return res.status(500).json({ok: false, message: 'Server error'});
    }
}

exports.deleteAvatar = async (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '..', 'uploads', filename);
    fs.unlink(filepath, async (err) => {
        if(err) {
            return res.status(500).json({message: 'Error deleting file', error: err});
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {'profile.additionalInfo.logo': ''},
            {new: true}
        );
        if(!updatedUser) {
            return res.status(404).json({ok: false, message: 'User not found'});
        }
        res.status(200).json({ok: true, message: 'File deleted successfully'});
    });
}

exports.uploadTeamAvatar = async (req, res) => {
    try {
        const teamAvatar = `http://localhost:5000/uploads/${req.file.filename}`;
        return res.status(200).json({ok: true, url: teamAvatar});
    }catch(error) {
        return res.status(500).json({ok: false, message: 'Server error'});
    }
}

exports.deleteTeamAvatar = async (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '..', 'uploads', filename);
    fs.unlink(filepath, async (err) => {
        if(err) {
            return res.status(500).json({message: 'Error deleting file', error: err});
        }
        res.status(200).json({ok: true, message: 'File deleted successfully'});
    });
}

exports.addTeamMember = async (req, res) => {
    try {
        const userId = req.user.id;
        const newTeamMember= req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { 'profile.teamMembers': newTeamMember } },
            { new: true }
        );
        if(!updatedUser) {
            return res.status(404).json({ok: false, message: 'User not found'});
        }
        return res.status(200).json({ok: true, updatedUser});
    }catch(err) {
        return res.status(500).json({ok: false, message: 'Server Error'});
    }
}