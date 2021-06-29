const mongoose = require('mongoose');


const commentSchema = mnogoose.Schema({
    content: {
        type: String, required: true
    },
    //comment belong to user
    user: {
        type: moongose.Schema.Type.ObjectId,
        ref: 'User'
    },
    post: {
        type: moongose.Schema.Type.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
});

const Commment = mongoose.model('Comment', commentSchema);
module.exports = Comment;