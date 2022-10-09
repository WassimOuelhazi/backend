
const User = require("../Models/user");
module.exports = {
  CreateUser: async function (request, result) {
    const newUser = {
      nom: request.body.nom,
      email: request.body.email,
      password: request.body.password,
      role: request.body.role,
      adresse:request.body.adresse,
      tel:request.body.tel,
      token:request.body.token,
      //image:request.file.filename
    };
    User.create(newUser, (error, user) => {
    if (error) {
        result.status(500).json({
          message: error,
          status: 500,
        });
      }
       else {
        result.status(200).json({
          message: "user is created",
          status: 200,
          data: user,
        });
      }
    });
  },

  GetAllUsers: function (req, res) {
    User.find({})
      .exec((err, ListUsers) => {
        if (err) {
          res.status(500).json({
            message: "echec d'avoir la liste",
            status: 500,
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "C'est la liste des utilisateurs",
            data: ListUsers,
          });
        }
      });
  },
  DeleteUser: function (req, res) {
    User.deleteOne({ _id: req.params.id }).exec((err, user) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "utilisateur supprimé !",
          data: user,
        });
      }
    });
  },
  UpdateUser: function (req, res) {
    User.updateOne({ _id: req.params.id }, req.body).exec((err, userUpdate) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "utilisateur modifié !",
          data: userUpdate,
        });
      }
    });
  },
  GetUserByID: function (req, res) {
    User.findOne({ _id: req.params.id }).exec((err, userByid) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "utilisateur séléctonné par ID !",
          data: userByid,
        });
      }
    });
  },
};
