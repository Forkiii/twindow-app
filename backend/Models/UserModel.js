import mongoose from 'mongoose';
import { Friendship } from './FriendModel.js';
const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  is_online:{
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('User', User);