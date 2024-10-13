const express = require('express');
const { getFriendsPosts, getNonFriendsPostsWithFriendsComments } = require('../controllers/feedController');

const router = express.Router();

router.get('/friends/:userId', getFriendsPosts);

router.get('/nonfriends-comments/:userId', getNonFriendsPostsWithFriendsComments);

module.exports = router;
