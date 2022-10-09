
const Stock = require("../Models/stock")
module.exports= {
     CreateStock: async function (request,result)
     { console.log("ffff");
        const newStock={
            estamp:request.body.estamp,
            QteEstamp:request.body.QteEstamp,
            efleur:request.body.efleur,
            QteEfleur:request.body.QteEfleur,
            
        };
        Stock.create(newStock, (error, stock)=>{
            if (error){
                result.status(500).json({
                    message:error,
                    status:500   
            
                });
                console.log(error)
            } else {
                result.status(200).json({
                    message:"stock is created",
                    status:200,
                    data:stock,
                });

                }

            });
        },
        UpdateStock: function (req, res) {
            Stock.updateOne({ _id: req.params.id }, req.body).exec((err, stockUpdate) => {
            if (err) {
              res.status(500).json({
                message: err.message,
                status: 500,
              });
            } else {
              res.status(200).json({
                status: 200,
                message: "le stock est modifié !",
                data: stockUpdate,
              });
            }
          });
        },

//get stock by ID 
        GetStockByID: function (req, res) {
            Stock.findOne({ _id: req.params.id }).exec((err, stockByid) => {
             if (err) {
               res.status(500).json({
                 message: err.message,
                 status: 500,
               });
             } else {
               res.status(200).json({
                 status: 200,
                 message: "stock est séléctonné par ID !",
                 data: stockByid,
               });
             }
           });
         },
//delete stock
DeleteStock: function (req, res) {
    Stock.deleteOne({ _id: req.params.id }).exec((err, newstock) => {
    if (err) {
      res.status(500).json({
        message: err.message,
        status: 500,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "le stock est supprimé !",
        data: newStock,
      });
    }
  });
},

//GEt all stock


        GetAllStock: function (req, res) {
            Estamp.find({})
            .populate('estamps')
            .populate('efleur')
              .exec((err, ListStock) => {
                if (err) {
                  res.status(500).json({
                    message: "echec d'avoir la liste",
                    status: 500,
                  });
                } else {
                  res.status(200).json(ListStock);
                }
              });
          }

        }

      