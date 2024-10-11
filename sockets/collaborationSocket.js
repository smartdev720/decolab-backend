const Collaboration = require('../models/Collaboration');
const Post = require('../models/Post');

const addNewPending = async (data) => {
    try {
        const newPending = new Collaboration(data);
        await newPending.save();
        await Post.findByIdAndUpdate(
            newPending.postId, 
            { isRequested: true },
            { new: true, runValidators: true }
        );
        return newPending;
    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    addNewPending,
}