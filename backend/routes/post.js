const express = require('express');
const { createPost, addComment } = require('../controllers/postController');
const { likePost } = require('../controllers/postController');
const router = express.Router();

router.post('/create', createPost);

router.post('/comment', addComment);

router.post('/like/:postId/:userId', likePost);

module.exports = router;
