const  Efleur   = require ("../Models/efleur");
module.exports= {
     CreatEfleur: async function (request,result)
     { console.log(request.body);
        const newEfleur={
            nom: request.body.nom,
            photo:request.file.filename,
            //prix:request.body.prix,
            description:request.body.description,
            QunatityEfleurDisponible:Number.parseInt(request.body.QunatityEfleurDisponible)
        };
        Efleur.create(newEfleur, (error, Efleur)=>{
            if (error){
                result.status(500).json({
                    message:error,
                    status:500

                });
            } else {
                result.status(200).json({
                    message:"Efleur is created",
                    status:200,
                    data:Efleur,
                });

                }

            });
        },
        UpdateEfleur: function (req, res) {
         Efleur.updateOne({ _id: req.params.id }, req.body).exec((err, EfleurUpdate) => {
            if (err) {
              res.status(500).json({
                message: err.message,
                status: 500,
              });
            } else {
              res.status(200).json({
                status: 200,
                message: "le timbre est modifié !",
                data: EfleurUpdate,
              });
            }
          });
        },

        UpdateEtaProductEfleur: function (req, res) {
          Efleur.updateOne({ _id: req.params.id }, {"etatProduct":"OUI"}).exec((err, efleurUpdate) => {
             if (err) {
               res.status(500).json({
                 message: err.message,
                 status: 500,
               });
             } else {
               res.status(200).json({
                 status: 200,
                 message: "etat est modifié !",
                 data: efleurUpdate,
               });
            }
            
           });
         },

//get Efleur by ID 
        GetEfleurByID: function (req, res) {
        Efleur.findOne({ _id: req.params.id }).exec((err, EfleurByid) => {
             if (err) {
               res.status(500).json({
                 message: err.message,
                 status: 500,
               });
             } else {
               res.status(200).json({
                 status: 200,
                 message: "les fleurs sont  séléctonné par ID !",
                 data: EfleurByid,
               });
             }
           });
         },
//delete Efleur 
DeleteEfleur: function (req, res) {
  Efleur.deleteOne({ _id: req.params.id }).exec((err, Efleur) => {
    if (err) {
      res.status(500).json({
        message: err.message,
        status: 500,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "un timbre est supprimé !",
        data: Efleur,
      });
    }
  });
},

//GEt all Efleur 


        GetAllEfleur: function (req, res) {
            Efleur.find({})
              .exec((err, ListEfleur) => {
                if (err) {
                  res.status(500).json({
                    message: "echec d'avoir la liste",
                    status: 500,
                  });
                } else {
                  res.status(200).json(ListEfleur);
                }
              });
          },


          GetEfleurEtatOui: function (req, res) {
            Efleur.find({"etatProduct":"OUI"})
            //.populate('categorie')
              .exec((err, ListEfleurs) => {
                if (err) {
                  res.status(500).json({
                    message: "echec d'avoir la liste",
                    status: 500,
                  });
                } else {
                  res.status(200).json(ListEfleurs);
                }
              });
          },

          GetEfleurEtatNon: function (req, res) {
            Efleur.find({"etatProduct":"NON"})
            //.populate('categorie')
              .exec((err, ListEfleurs) => {
                if (err) {
                  res.status(500).json({
                    message: "erreur d'afficahe",
                    status: 500,
                  });
                } else {
                  res.status(200).json(ListEfleurs);
                }
              });
          }

        }

      