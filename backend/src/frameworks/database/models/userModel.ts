import { Schema, model } from "mongoose";

const userSchema = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  googleUser: {
    type: Boolean,
  },
  profilePic: {
    type: String,
    default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
  },
  bio: {
    type: String,
    default: ''
  },
  followers: [{ type: String, ref: 'User' }],
  following: [{ type: String, ref: 'User' }],
  saved: [{ type: String, ref: 'Post' }],
  createdAt: {
     type: Date,
     default: Date.now 
  }
});

const User = model("User", userSchema);
export default User;
