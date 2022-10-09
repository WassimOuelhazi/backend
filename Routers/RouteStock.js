
const routeStock = require ("express").Router();//importer fonction Router() de express
const stockController=require("../Controllers/stockController")


routeStock.post("/createStock",stockController.CreateStock);
routeStock.get("/GetAllStock",stockController.GetAllStock);
routeStock.get("/GetStockByID/:id",stockController.GetStockByID);
routeStock.put("/UpdateStock/:id",stockController.UpdateStock);
routeStock.delete("/DeleteStock/:id",stockController.DeleteStock);


module.exports =routeStock