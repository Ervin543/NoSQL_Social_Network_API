const { User, Thought } = require('../models');

const userController = {
    // GET all users
    getAllUsers: async (req, res) => {
        try {
            const userData = await User.find({})
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v');
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // GET a single user by _id and populated thought and friend data
    getUserById: async (req, res) => {
        try {
            const userData = await User.findOne({ _id: req.params.id })
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v');
            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // POST a new user
    createUser: async (req, res) => {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // PUT to update a user by _id
    updateUserById: async (req, res) => {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // DELETE to remove user by _id
    deleteUserById: async (req, res) => {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.id });
            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            // Remove associated thoughts
            await Thought.deleteMany({ username: userData.username });
            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // POST to add a new friend to a user's friend list
    addFriend: async (req, res) => {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },


    // DELETE to remove a friend from a user's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = userController;
