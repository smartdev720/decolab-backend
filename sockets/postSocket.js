const Post = require('../models/Post');
const User = require('../models/user');

const addNewPost = async (data) => {
    try {
        const newPost = new Post(data);
        await newPost.save();
        const user = await User.findById(newPost.authorId);
        return {
            ...newPost._doc,
            companyId: user._id,
            companyName: user.name,
            companyAvatar: user.profile.additionalInfo.logo
        };
    }catch (err) {
        console.log(err);
    }
}

module.exports = {
    addNewPost,
}