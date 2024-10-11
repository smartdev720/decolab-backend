const Notification = require('../models/Notification');
const User = require('../models/user');

const addNewNotification = async (data) => {
    try {
        const newNotification = new Notification(data);
        await newNotification.save();
        const sender = await User.findById(newNotification.senderId);
        return {
            notification: newNotification,
            sender
        };
    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    addNewNotification,
}