const User = require('../models/user');
const Post = require('../models/Post');

exports.getFriendsPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendIds = user.friends.map(friend => friend._id);
    const posts = await Post.find({ userId: { $in: friendIds } }).populate('userId').populate('comments');

    res.status(200).json({ message: 'Friend posts retrieved successfully', posts });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving friend posts', error });
  }
};
