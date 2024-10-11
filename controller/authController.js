const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {name, email, password, profile} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profile
        });
        await newUser.save();
        return res.status(201).json({ok: true, message: 'User registered successfully'});
    }catch (err) {
        return res.status(500).json({ok: false,
             message: 'Server error', err });
    }
}


exports.emailLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.json({ok: false, message: 'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({ok: false, message: 'Invalid credentials'});
        }

        const payload = {id: user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});
        
        return res.json({ok: true, token: `Bearer ${token}`});
    }catch(err) {
        return res.status(500).json({ message: 'Server error', err });
    }
}
