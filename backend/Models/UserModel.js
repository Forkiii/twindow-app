import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  // Remove email field completely if you're not using it
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

export default mongoose.model('User', userSchema);