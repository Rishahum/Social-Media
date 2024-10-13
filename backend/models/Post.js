const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  likes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
