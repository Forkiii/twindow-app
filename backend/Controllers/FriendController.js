import FriendRequest, { Friendship } from '../Models/FriendModel.js';
import User from "../Models/UserModel.js";
export const createFriendRequest = async (req, res) => {
    try {
        //reciever name from body beacuse we need to find the user to send the request to
        const { receiverUsername } = req.body
        const senderUsername = req.user.username; 
        const existingUser = await User.findOne({ username: receiverUsername });
        if (!existingUser) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        if (receiverUsername === senderUsername) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }
        //existing request
        const existingRequest = await FriendRequest.findOne({
            senderUsername,
            receiverUsername,
            status: 'pending'
        });
        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already sent" });
        }

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

        const existingFriendship = await Friendship.findOne({
            $or: [
                { firstUsername: senderUsername, secondUsername: receiverUsername },
                { firstUsername: receiverUsername, secondUsername: senderUsername }
            ]
        });
        if (existingFriendship) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }


        //

        const newFriendRequest = new FriendRequest({
            senderUsername,
            receiverUsername,
        });
        console.log('New friend request status:', newFriendRequest.status);

        await newFriendRequest.save();
        res.status(201).json({
            message: "Friend request sent successfully", requestId: newFriendRequest._id, senderUsername: newFriendRequest.senderUsername,
            receiverUsername: newFriendRequest.receiverUsername, status: newFriendRequest.status
        });
    }
    catch (err) {

        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export const updateFriendRequest = async (req, res) => {
    try {
        const senderUsername = req.params.senderUsername;
        const  {status}  = req.body;
        const currentUsername = req.user.username; 
        if (!status || !['accepted', 'rejected'].includes(status)) {
                return res.status(400).json({ 
                message: "Invalid status. Must be 'accepted' or 'rejected'",
                received: status,
                type: typeof status
            });
        }
        
        
        const friendRequest = await FriendRequest.findOne({
            senderUsername: senderUsername,
            receiverUsername: currentUsername,
            status: 'pending'  // Only pending requests
        });
        
        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found or already processed" });
        }
        
        if (status === "accepted") {
            // Create friendship 
            const [first, second] = [currentUsername, senderUsername].sort();
            const newFriendship = new Friendship({
                firstUsername: first,
                secondUsername: second,
            });
            await newFriendship.save();
            
            await FriendRequest.findByIdAndDelete(friendRequest._id);
            
            return res.status(200).json({ 
                message: "Friend request accepted",
                friend: senderUsername
            });
        }
        
        if (status === 'rejected') {
            // Delete the request
            await FriendRequest.findByIdAndDelete(friendRequest._id);
            
            return res.status(200).json({ message: "Friend request rejected" });
        }
        
    } catch (err) {
        console.error('Update friend request error:', err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

    export const removeFriend = async (req, res) => {
        try {
            const currentUsername = req.user.username;
            const friendUsername = req.params.friendUsername; 
                
            // Delete the friendship where current user is in EITHER position
            const deletedFriendship = await Friendship.findOneAndDelete({
                $or: [
                    { firstUsername: currentUsername, secondUsername: friendUsername },
                    { firstUsername: friendUsername, secondUsername: currentUsername }
                ]
            });
            
            // Check if friendship existed
            if (!deletedFriendship) {
                return res.status(404).json({ message: "Friendship not found or you are not friends" });
            }
            return res.status(200).json({ 
                message: "Friend removed successfully",
                removedFriend: friendUsername
            });
            
        } catch (err) {
            console.error('Remove friend error:', err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    };

export const getFriendRequests = async (req, res) => {
    try {
        const currentUsername = req.user.username;
        const requests = await FriendRequest.find({
            receiverUsername: currentUsername
        });

        if (requests.length === 0) {
            return res.status(200).json({ 
                message: "No Friend Requests Found",
                data: []
            });
        }
        
        return res.status(200).json({
            message: "Friend Requests Found",
            data: requests
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


export const getFriends = async (req, res) => {
    try {
        const currentUsername = req.user.username;

        const requests = await Friendship.find({
            $or: [
                { firstUsername: currentUsername },
                { secondUsername: currentUsername }
            ]
        })
        console.log(requests.length);

        if (requests.length === 0) {
            return res.status(400).json({ message: "No Friendships Found" });
        }
        return res.json(requests);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
