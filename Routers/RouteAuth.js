const routeAuth = require("express").Router();
//const authController = require("../Controllers/authController");
const authController = require("../Controllers/auth");
routeAuth.post("/login", authController.Login);
routeAuth.post("/registre",authController.Registre);
routeAuth.get("/resetPassword",authController.resetPassword)
module.exports = routeAuth;