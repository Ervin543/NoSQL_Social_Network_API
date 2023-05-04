const { User, Thought } = require('../models');

const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // GET a single user by _id and populated thought and friend data
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
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
    },

    // POST a new user
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // PUT to update a user by _id
    updateUserById(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
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
    },

    // DELETE to remove user by _id
    deleteUserById(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                // BONUS: remove associated thoughts
                return Thought.deleteMany({ _id: { $in: userData.thoughts } });
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // POST to add a new friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
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
