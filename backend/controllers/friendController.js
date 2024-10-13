const User = require('../models/user');

const sendFriendRequest = async (req, res) => {
    const { recipientId } = req.body;
    const senderId = req.user;

    try {
        const recipient = await User.findById(recipientId);
        const sender = await User.findById(senderId);

        if (!recipient || !sender) {
            return res.status(404).json({ message: "User not found" });
        }

        if (recipient.friendRequests.includes(senderId)) {
            return res.status(400).json({ message: "Friend request already sent" });
        }

        if (recipient.friends.includes(senderId)) {
            return res.status(400).json({ message: "You are already friends" });
        }

        recipient.friendRequests.push(senderId);
        await recipient.save();

        res.status(200).json({ message: "Friend request sent" });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const acceptFriendRequest = async (req, res) => {
    const { senderId } = req.body;
    const recipientId = req.user;

    try {
        const recipient = await User.findById(recipientId);
        const sender = await User.findById(senderId);

        if (!recipient || !sender) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!recipient.friendRequests.includes(senderId)) {
            return res.status(400).json({ message: "No friend request from this user" });
        }

        recipient.friends.push(senderId);
        sender.friends.push(recipientId);

        recipient.friendRequests = recipient.friendRequests.filter(
            (id) => id.toString() !== senderId
        );

        await recipient.save();
        await sender.save();

        res.status(200).json({ message: "Friend request accepted" });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const rejectFriendRequest = async (req, res) => {
    const { senderId } = req.body;
    const recipientId = req.user;

    try {
        const recipient = await User.findById(recipientId);

        if (!recipient) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!recipient.friendRequests.includes(senderId)) {
            return res.status(400).json({ message: "No friend request from this user" });
        }

        recipient.friendRequests = recipient.friendRequests.filter(
            (id) => id.toString() !== senderId
        );

        await recipient.save();

        res.status(200).json({ message: "Friend request rejected" });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const getFriendRequests = async (req, res) => {
    const userId = req.user;

    try {
        const user = await User.findById(userId).populate('friendRequests', 'username email');

        res.status(200).json({ friendRequests: user.friendRequests });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendRequests
};
