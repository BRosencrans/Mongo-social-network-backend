const {Echo, User} = require("../models");

const echoController = {
  //Finds all Echos(posts)
  getAllEchos(req, res) {
    Echo.find({})
      .populate({
        path: "echoEcho",
        select: "-__v",
      })
      .select("-__v")
      .then((allEchos) => res.json(allEchos))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //Finds one Echo(post) by its Id
  getEchoById({params}, res) {
    Echo.findOne({_id: params.id})
      .then((oneEcho) => {
        // if no thought is found
        if (!oneEcho) {
          res.status(404).json({message: "There is no Echo attached to this ID, please try again"});
          return;
        }
        res.json(oneEcho);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //Creates a new Echo attached to a specified user Id
  createEcho({body}, res) {
    Echo.create(body)
      .then((newEcho) => {
        return User.findOneAndUpdate(
          {_id: body.userId },
          {$push: {echos: newEcho._id}},
          {new: true}
        );
      })
      .then((newEcho) => {
        if (!newEcho) {
          res.status(404).json({message: "No user with this ID exists"});
          return;
        }
        res.json(newEcho);
      })
      .catch((err) => res.json(err));
  },
  //Updates an Echos text based on its id
  updateEcho({params, body}, res) {
    Echo.findOneAndUpdate({_id: params.id}, body, {new: true})
      .then((fixEcho) => {
        if (!fixEcho) {
          res.status(404).json({message: "No Echo with this ID exists"});
          return;
        }
        res.json(fixEcho);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Deletes an Echo based on its id
  deleteEcho({params}, res) {
    Echo.findOneAndDelete({_id: params.id})
      .then((EchoNoMore) => {
        if (!EchoNoMore) {
          res.status(404).json({message: "No Echo with this ID exists"});
          return;
        }
        res.json(EchoNoMore);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Creates An Echo Echo (response) for an Echo(post)
  addEchoEcho({params, body}, res) {
    Echo.findOneAndUpdate(
      {_id: params.id},
      {$addToSet: {echoEcho: body}},
      {new: true}
    )
      .then((newEchoEcho) => {
        if (!newEchoEcho) {
          res.status(404).json({message: "No Echo with this ID exists"});
          return;
        }
        res.json(newEchoEcho);
      })
      .catch((err) => res.json(err));
  },
  //Deletes An Echo Echo (response) from an Echo(post) based on the id of an Echo
  deleteEchoEcho({params}, res) {
    Echo.findOneAndUpdate(
      {_id: params.id},
      {$pull: {echoEcho: {echoEchoId: params.echoEchoId}}},
      {new: true}
    )
      .then((silence) => res.json(silence))
      .catch((err) => res.json(err));
  },
};

module.exports = echoController;