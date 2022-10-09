const User = require("../Models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();
// const { randomBytes } = require("crypto");
// const { join } = require("path");
 const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const DOMAIN = process.env.APP_DOMAIN;
// const SECRET = process.env.APP_SECRET;
 const TOKEN_KEY = process.env.TOKEN_KEY;
 //const TOKEN_KEY="istmyEstamps";

module.exports = {
    Login: async function (req, res) {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email, password });
          if (!user) {
            res.status(401).json({
              message: "Login not successful",
              error: "User not found",
            });
          } else {
            res.status(200).json({
              message: "Login successful",
              user,
            });
          }
        } catch (error) {
          res.status(400).json({
            message: "An error occurred",
            error: error.message,
          });
        }
      },

    Registre: async function(req,res){
      try {
        // Get user input
        const { email, password,role } = req.body;
    
        // Validate user input
        if (!(email && password && role)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          // first_name,
          // last_name,
          role,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
          
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
    },

   
  }