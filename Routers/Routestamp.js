
const upload = require("../middelwares/upload");
const routeEstamp = require ("express").Router();//importer fonction Router() de express
const estampController=require("../Controllers/estampsController");// importer de path estamp controller


routeEstamp.post("/createEstamp",upload.single("photo"),estampController.CreateStamp);
routeEstamp.get("/GetAllEstamp",estampController.GetAllEstamp);
routeEstamp.get("/GetEstampByID/:id",estampController.GetEstampByID);
routeEstamp.put("/UpdateEstamp/:id",estampController.UpdateEstamp);
routeEstamp.delete("/DeleteEstamp/:id",estampController.DeleteEstamp);
routeEstamp.get("/updateEtat/:id",estampController.UpdateEtaProductEstamp)
routeEstamp.get("/getOuiEtatProductEstamp",estampController.GetEstampEtatOui)
routeEstamp.get("/getNonEtatProductEstamp",estampController.GetEstampEtatNon)


module.exports =routeEstamp