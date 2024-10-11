const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    profile: {
        websiteUrl: {type: String, required: true},
        industry: [{type: String}],
        location: {type: String, default: ''},
        socialLinks: {
            twitterHandle: {type: String, unique: true, sparse: true, default: ''},
            telegram: {type: String, default: ''},
            github: {type: String, default: ''}
        },
        teamMembers: [{
            name: {type: String, default: ''},
            avatar: {type: String, default: ''},
            role: {type: String, default: ''},
            contactEmail: {type: String, default: ''},
            linkedin: {type: String, default: ''}
        }],
        additionalInfo: {
            logo: {type: String, default: ''},
            bio: {type: String, default: ''}
        }
    }
});

module.exports = mongoose.model('User', userSchema);