import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
    {
        userId: {
            type: String
        },
        user: {
            type: String,
            ref: 'User',
            required: true
        },
        comment: {
            postId: {
                type: String,
                ref: 'Post'
            },
            text: {
                type: String,
            }
        },
        follow: {
            type: Boolean
        },
        liked: {
            type: String,
            ref: 'Post'
        }
    }, {
    timestamps: true
}
)

const Notification = model("Notification", notificationSchema);
export default Notification;