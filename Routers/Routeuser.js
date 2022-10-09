
const routeuser = require ("express").Router(); 
const userController=require("../Controllers/userController"); 

routeuser.post("/CreateUser",userController.CreateUser)  

routeuser.get("/GetallUsers",userController.GetAllUsers)  
routeuser.put("/UpdateUser/:id",userController.UpdateUser) 
routeuser.delete("/deleteUser/:id",userController.DeleteUser)
routeuser.get("/GetUserById/:id",userController.GetUserByID)  



module.exports =routeuser
