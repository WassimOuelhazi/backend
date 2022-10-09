const categorie = require("../Models/categorie");
const Categorie = require("../Models/categorie");
module.exports = {
  CreateCategorie: async function (request, result) {
    console.log(request.body);
    const newCategorie= {
      annee: request.body.annee,
      theme: request.body.theme,
      artiste: request.body.artiste,
      forme: request.body.forme,
      prix: request.body.prix,
      categorie:request.body.categorie
    };

    Categorie.create(newCategorie, (error, categorie) => {
        if (error) {
          result.status(500).json({
            message: error,
            status: 500,
          });
        } else {
          result.status(200).json({
            message: "categorie is created",
            status: 200,
            data: categorie,
          });
        }
      });
    },


    UpdateCategorie: function (req, res) {
      categorie.updateOne({ _id: req.params.id }, req.body).exec((err, categorieUpdate) => {
        if (err) {
          res.status(500).json({
            message: err.message,
            status: 500,
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "catégorie modifié !",
            data: categorieUpdate,
          });
        }
      });
    },
    DeleteCategorie: function (req, res) {
     Categorie.deleteOne({ _id: req.params.id }).exec((err, categorie) => {
        if (err) {
          res.status(500).json({
            message: err.message,
            status: 500,
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "catégorie supprimé !",
            data: categorie,
          });
        }
      });
    },
    GetCategorieByID: function (req, res) {
     categorie.findOne({ _id: req.params.id }).exec((err, CategorieByid) => {
        if (err) {
          res.status(500).json({
            message: err.message,
            status: 500,
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Catégorie séléctonné par ID !",
            data: CategorieByid,
          });
        }
      });
    },


  
  GetAllCategorie:function (req, res) {

    Categorie.find({})
    .exec((err, ListCategorie) => {
      if (err) {
        res.status(500).json({
          message: "echec d'avoir la liste",
          status: 500
                             });
      } else {
        res.status(200).json({
          status: 200,
          message: "C'est la liste des utilisateur",
          data: ListCategorie
         });
        }
    }
    )}

  }
  
