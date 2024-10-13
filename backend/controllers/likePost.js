const Post = require('../models/Post');
const User = require('../models/user');

exports.likePost = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const liked = post.likes.includes(userId);

    if (liked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
      await post.save();
      return res.status(200).json({ message: 'Post unliked', likes: post.likes.length });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: 'Post liked', likes: post.likes.length });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error liking the post', error });
  }
};
