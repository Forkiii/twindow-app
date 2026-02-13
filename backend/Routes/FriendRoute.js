import express from 'express';
import { createFriendRequest, getFriendRequests, getFriends, removeFriend, updateFriendRequest } from '../Controllers/FriendController.js';
import { verifyToken } from '../Middlewares/AuthMiddleware.js';

const router = express.Router();


// ========================== Friend Routes ==========================
router.post('/friend-requests', verifyToken, createFriendRequest);
router.get('/friend-requests', verifyToken, getFriendRequests);
router.patch('/friend-requests/:requestId', verifyToken, updateFriendRequest);
router.get('/friends', verifyToken, getFriends);
router.delete('/friends/:friendId', verifyToken, removeFriend);

export default router;