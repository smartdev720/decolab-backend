const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, required: true},
    tags: [{type: String}],
    timeFrame: {type: String, required: true},
    timeUnit: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    followers: {type: Number, default: 0},
    views: {type: Number, default: 0},
    isClosed: {type: Boolean, default: false},
    isRequested: {type: Boolean, default: false},
});

module.exports = mongoose.model('post', postSchema);