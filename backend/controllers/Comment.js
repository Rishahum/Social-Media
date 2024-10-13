const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const { userId, postId, text } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comment({
      userId,
      postId,
      text
    });

    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};
