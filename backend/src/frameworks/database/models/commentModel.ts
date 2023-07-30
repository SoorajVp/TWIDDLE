import { Schema, model } from "mongoose";

const commentSchema = new Schema({

    userId: {
        type: String,
        ref: "User",
        required: true
    },
    postId: {
        type: String,
        ref: "Post",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Comment = model( "Comment", commentSchema );
export default Comment;