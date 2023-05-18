// const { User } = require('../models');

// const friendController = {
//   // add friend
//   addFriend({ params }, res) {
//     User.findOneAndUpdate(
//       { _id: params.userId },
//       { $addToSet: { friends: params.friendId } },
//       { new: true }
//     )
//       .then(dbUserData => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: 'No user found with this id!' });
//         }
//         res.json(dbUserData);
//       })
//       .catch(err => res.status(500).json(err));
//   },

//   // remove friend
//   removeFriend({ params }, res) {
//     User.findOneAndUpdate(
//       { _id: params.userId },
//       { $pull: { friends: params.friendId } },
//       { new: true }
//     )
//       .then(dbUserData => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: 'No user found with this id!' });
//         }
//         res.json(dbUserData);
//       })
//       .catch(err => res.status(500).json(err));
//   }
// };

// module.exports = friendController;


const { User } = require('../models');

const friendController = {
  // add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to add friend.' });
      });
  },

  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to remove friend.' });
      });
  }
};

module.exports = friendController;

