import { Schema, model } from "mongoose";

const postSchema = new Schema({
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
    comments: [],
    report: [],
    createdAt: {
        type: Date,
        default: new Date() 
     }
})

const Post = model("Post", postSchema);
export default Post;

