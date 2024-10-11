const Notification = require('../models/Notification');

const getAllNotification = async (req, res) => {
    try {
        const notifications = await Notification.find().populate('senderId');
        const transformedNotifications = notifications.map(notification => ({
            notification,
            sender: notification.senderId
        }));
        return res.status(200).json({ok: true, notifications: transformedNotifications});
    }catch(err) {
        return res.status(500).json({ok: false, message: 'Server error'});
    }
}

const allNotificationRead = async (req, res) => {
    try {
        const result = await Notification.updateMany({ isRead: false }, { isRead: true });
        return res.status(200).json({ ok: true, message: 'Read all', updatedCount: result.modifiedCount });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Server error' });
    }
}

const collaborationRead = async (req, res) => {
    try {
        const result = await Notification.updateMany(
            { type: "CollaborationRequest", isRead: false },
            { isRead: true }
        );
        return res.status(200).json({ ok: true, message: 'Read all', updatedCount: result.modifiedCount });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Server error' });
    }
}

module.exports = {
    getAllNotification,
    allNotificationRead,
    collaborationRead,
}