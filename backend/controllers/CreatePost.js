const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { userId, text } = req.body;

  try {
    const newPost = new Post({
      userId,
      text
    });

    await newPost.save();

    res.status(201).json({ message: 'Post created successfully!', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};
