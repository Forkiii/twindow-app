import express from 'express';
import { createFriendRequest, getFriendRequests, getFriends, removeFriend, updateFriendRequest } from '../Controllers/FriendController.js';
import { verifyToken } from '../Middlewares/AuthMiddleware.js';

const router = express.Router();


// ========================== Friend Routes ==========================
router.post('/friend-requests', verifyToken, createFriendRequest);
router.patch('/friend-requests/:senderUsername', verifyToken, updateFriendRequest);
router.get('/friend-requests', verifyToken, getFriendRequests);
router.get('/friends', verifyToken, getFriends);
router.delete('/friends/remove/:friendUsername', verifyToken, removeFriend);

export default router;