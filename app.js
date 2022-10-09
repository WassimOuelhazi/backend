var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server);
var path = require('path');

//****************serveur */
//var express= require("express")
var cors = require("cors")
const {success,error} = require("consola")
//var app = express();
 const port=3000;
 const DB= require("./Config/database")

const { urlencoded } = require("express");
// cette partie 2 ajouté aprés  routestamps.js
const routeEstamp = require("./Routers/Routestamp");
const routeUser = require("./Routers/Routeuser");
const routeCategorie=require("./Routers/RouteCategorie");
const routeAuth = require("./Routers/RouteAuth");
const routeEfleur = require("./Routers/Routeefleur");
const routeCart = require("./Routers/RouteCart");
const routerProduct = require("./Routers/RouteProduct");
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
app.use("/Cart",routeCart);
app.use("/product",routerProduct);

app.use(express.static('storages'));

//***************************fin serveur */

app.use(express.static(path.join(__dirname,'./public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


var name;

io.on('connection', (socket) => {
  console.log('new user connected');
  
  socket.on('joining msg', (username) => {
  	name = username;
  	io.emit('chat message', `---${name} joined the chat---`);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', `---${name} left the chat---`);
    
  });
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);         //sending message to all except the sender
  });
});

server.listen(3000, () => {
  console.log('Server listening on :3000');
});

//************server */

// app.listen(port,async()=>{
//   try {
//     success({
//       message:`sucess to connect to server via port:${port}`,
//       badge:true
//     })
//   } catch (error) {
//     error({
//       message:"error",
//       badge:true
//     })
//   }
// })