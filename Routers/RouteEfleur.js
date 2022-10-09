
const upload = require("../middelwares/upload");
const routeEfleur = require ("express").Router();//importer fonction Router() de express
const EfleurController=require("../Controllers/efleurController");// importer de path Efleur controller


routeEfleur.post("/createEfleur",upload.single("photo"),EfleurController.CreatEfleur);
routeEfleur.get("/GetAllEfleur",EfleurController.GetAllEfleur);
routeEfleur.get("/GetEfleurByID/:id",EfleurController.GetEfleurByID);
routeEfleur.put("/UpdateEfleur/:id",EfleurController.UpdateEfleur);
routeEfleur.delete("/DeleteEfleur/:id",EfleurController.DeleteEfleur);


routeEfleur.get("/updateEtat/:id",EfleurController.UpdateEtaProductEfleur)
routeEfleur.get("/getOuiEtatProductEfleur",EfleurController.GetEfleurEtatOui)
routeEfleur.get("/getNonEtatProductEfleur",EfleurController.GetEfleurEtatNon)


module.exports =routeEfleur