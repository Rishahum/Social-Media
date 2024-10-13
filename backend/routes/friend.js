// routes/friend.js
const express = require('express');
const {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendRequests
} = require('../controllers/friendController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/send', authMiddleware, sendFriendRequest);
router.post('/accept', authMiddleware, acceptFriendRequest);
router.post('/reject', authMiddleware, rejectFriendRequest);
router.get('/requests', authMiddleware, getFriendRequests);

module.exports = router;
