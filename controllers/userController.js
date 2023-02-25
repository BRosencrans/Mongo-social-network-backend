const {User, Echo} = require("../models");

const userController = {
  //Finds all the users and their posts and displays the users them from oldest to newest
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .populate({
        path: "echos",
        select: "-__v",
      })
      .sort({ _id: 1 })
      .then((allUsers) => res.json(allUsers))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //Finds a user by their id and displays their posts
  getUserById({params}, res) {
    User.findOne({_id: params.id})
      .select("-__v")
      .populate({
        path: "echos",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .then((oneUser) => {
        if (!oneUser) {
          res.status(404).json({message: "No user with this ID exists"});
          return;
        }
        res.json(oneUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Creates a new user
  createUser({body}, res) {
    User.create(body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.status(400).json(err));
  },
  // Allows one to update user info based on the user id
  updateUser({params, body}, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {new: true})
      .then((updateUser) => {
        if (!updateUser) {
          res.status(404).json({message: "No user with this ID exists"});
          return;
        }
        res.json(updateUser);
      })
      .catch((err) => res.status(400).json(err));
  },
 //Deletes a user and associated echos(posts)
  deleteUser({params}, res) {
    User.findOneAndDelete({ _id: params.id})
      .then((deleteUser) => {
        if (!deleteUser) {
          return res.status(404).json({message: "No user with this ID exists"});
        }
        return Echo.deleteMany({_id: {$in: deleteUser.echos}});
      })
      .then(() => {
        res.json({message: "User and Echos have been deleted, have a wonderful day!"});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Adds a friend to a users friend list
  addFriend({params}, res) {
    User.findOneAndUpdate(
      {_id: params.id},
      {$addToSet: {friends: params.friendsId}},
      {new: true}
    )
      .then((newFriend) => res.json(newFriend))
      .catch((err) => res.status(400).json(err));
  },
//Deletes a friend from a users friend list
  removeFriend({params}, res) {
    User.findOneAndUpdate(
      {_id: params.id},
      {$pull:{friends: params.friendsId}},
      {new: true}
    )
      .then((deleteFriend) => {
        if (!deleteFriend) {
          res.status(404).json({message: "No user with this ID exists"});
          return;
        }
        res.json(deleteFriend);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;