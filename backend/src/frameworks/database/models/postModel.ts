import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    createdAt: Date,
  });

const postSchema = new Schema({
    isBlocked: {
        type: Boolean,
        default: false
    },
    userId:{
        type: String,
        ref: "User",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    likes: [],
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now 
     }
})

const Post = model("Post", postSchema);
export default Post;

