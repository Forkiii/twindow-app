import FriendRequest from '../Models/FriendModel.js';
import User from "../Models/UserModel.js";
export const createFriendRequest = async (req, res) => {
    try {
        //reciever name from body beacuse we need to find the user to send the request to
        const { receiverUsername } = req.body
        const senderUsername = req.user.username; // sender  usrname from token because we need to find the user to send the request from
        const existingUser = await User.findOne({ username: receiverUsername });
        if (!existingUser) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        if (receiverUsername === senderUsername) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }


        //existing
        const existingRequest = await FriendRequest.findOne({
            senderUsername,
            receiverUsername,
            status: 'pending'
        });
        // if (existingRequest) {
        //     return res.status(400).json({ message: "Friend request already sent" });
        // }

        //reverse
        const reverseRequest = await FriendRequest.findOne({
            senderUsername: receiverUsername, receiverUsername: senderUsername,
            status: 'pending'
        });
        if (reverseRequest) {
            return res.status(400).json({
                message: "This user has already sent you a friend request. Please accept it instead."
            });
        }
        // already friends?
        // const existing  = await Friendship.findOne({
        //     $or: [
        //         { firstUsername: senderUsername, secondUsername: receiverUsername },
        //         { firstUsername: receiverUsername, secondUsername: senderUsername }
        //     ]
        // });
        // if (existingFriendship) {
        //     return res.status(400).json({ message: "You are already friends" });
        // }
        

        //
        const newFriendRequest = new FriendRequest({
            senderUsername,
            receiverUsername,
        });
        console.log('New friend request status:',  newFriendRequest.status);

        await newFriendRequest.save();
        res.status(201).json({ message: "Friend request sent successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
export const updateFriendRequest = async (req, res) => {
}

export const getFriendRequests = async (req, res) => {
}

export const getFriends = async (req, res) => {
}

export const removeFriend = async (req, res) => {
}

