import { Schema, model } from "mongoose";

const reportSchema = new Schema({
    userId:{
        type: String,
        ref: "User",
        required: true
    },
    postId:{
        type: String,
        ref: "Post",
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
     }
})

const ReportPost = model("Report", reportSchema);
export default ReportPost;

