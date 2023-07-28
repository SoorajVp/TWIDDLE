import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
    // required: true,
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
  createdAt: {
     type: Date,
     default: new Date() 
  }
});

const User = model("User", userSchema);
export default User;