


const routeCategorie = require ("express").Router(); 
const categorieController  = require("../Controllers/categorieController");

routeCategorie.post("/CreateCategorie",categorieController.CreateCategorie) ;
routeCategorie.get("/GetAllCategorie", categorieController.GetAllCategorie);
routeCategorie.put("/UpdateCategorie/:id",categorieController.UpdateCategorie);
routeCategorie.delete("/deleteCategorie/:id", categorieController.DeleteCategorie );
routeCategorie.get("/GetCategorieByID/:id",categorieController.GetCategorieByID)  ;

module.exports =routeCategorie