const Post = require('../models/Post');

exports.getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate('authorId', '_id name profile.additionalInfo.logo');

        const transformedPosts = posts.map(post => ({
            _id: post._id,
            companyId: post.authorId._id,
            companyName: post.authorId.name,
            companyAvatar: post.authorId.profile.additionalInfo.logo || '',
            followers: '0',
            views: '0',
            content: post.content,
            tags: post.tags,
            timeFrame: post.timeFrame,
            timeUnit: post.timeUnit,
            isClosed: false,
            createdAt: post.createdAt,
            isRequested: post.isRequested,
        }));

        return res.status(200).json({ ok: true, posts: transformedPosts });
    }catch (err) {
        return res.status(500).json({ok: false, message: 'Server error'});
    }
}