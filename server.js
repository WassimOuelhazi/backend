
;

var express= require("express")
var cors = require("cors")
const {success,error} = require("consola")
var app = express();
 const port= process.env.port || 3000;
 const DB= require("./Config/database")

const { urlencoded } = require("express");
// cette partie 2 ajouté aprés  routestamps.js
const routeEstamp = require("./Routers/Routestamp");
const routeUser = require("./Routers/Routeuser");
const routeCategorie=require("./Routers/RouteCategorie");
const routeAuth = require("./Routers/RouteAuth");
const routeEfleur = require("./Routers/Routeefleur");
const routeStock = require("./Routers/RouteStock");

//fin de partie 2
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//app.use fait partie du partie 2
app.use("/estamps", routeEstamp);
app.use("/user",routeUser);

app.use("/efleur",routeEfleur);

app.use("/categorie",routeCategorie);
app.use("/auth", routeAuth);
app.use("/stock", routeStock);

app.use(express.static('storages'));


app.listen(port,async()=>{
  try {
    success({
      message:`sucess to connect to server via port:${port}`,
      badge:true
    })
  } catch (error) {
    error({
      message:"error",
      badge:true
    })
  }
})