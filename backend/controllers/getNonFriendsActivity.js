const User = require('../models/user');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getNonFriendsPostsWithFriendsComments = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendIds = user.friends.map(friend => friend._id);

    const posts = await Post.find({
      comments: { $elemMatch: { userId: { $in: friendIds } } },
      userId: { $nin: friendIds } 
    }).populate('userId').populate({
      path: 'comments',
      populate: {
        path: 'userId',
        model: 'User'
      }
    });

    res.status(200).json({ message: 'Posts where friends have commented retrieved successfully', posts });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts', error });
  }
};
