import mongoose from 'mongoose';
const friendRequestSchema = new mongoose.Schema(
  {
    senderUsername: {
      type: String,
      ref: 'User',
      required: true,
    },

    receiverUsername: {
      type: String,
      ref: 'User',
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const friendshipSchema = new mongoose.Schema(
  {
    firstUsername: {
      type: String,
      ref: 'User',
      required: true,
    },

    secondUsername: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

  
friendshipSchema.index({ firstUsername: 1, secondUsername: 1 }, { unique: true }); // prevent duplicate friendships A-B and B-A
export default mongoose.model('FriendRequest', friendRequestSchema);
export const Friendship = mongoose.model('Friendship', friendshipSchema);