
const User = require("../Models/user");

const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");
const { join } = require("path");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const DOMAIN = process.env.APP_DOMAIN;
//const SECRET = process.env.APP_SECRET;
const SECRET ="JwtKEY123";
var randtoken = require('rand-token');


// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "rimtest43@gmail.com",
//     pass: "rim44test**",
//   },
// });

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testameny92@gmail.com",
    pass: "Testameny2021",
  },
});

function sendEmail(email, token) {
  var email = email;
  var token = token;
  var mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'ameny.ouelhazi@gmail.com', // Your email id
  pass: 'sticl1e2009' // Your password
  }
  });
  var mailOptions = {
  from: 'tutsmake@gmail.com',
  to: email,
  subject: 'Reset Password Link - Tutsmake.com',
  html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/reset-password?token=' + token + '">link</a> to reset your password</p>'
  };
  mail.sendMail(mailOptions, function(error, info) {
  if (error) {
  console.log(1)
  } else {
  console.log(0)
  }
  });
  }

module.exports = {
  Registre: async function (req, res) {
    try {
      //req.body["image"] = req.file.filename;
      const password = bcrypt.hashSync(req.body.password, 10);
      console.log("password",password)
      const newCustomer = new User({
        ...req.body,
        password,
        
        verificationCode: randomBytes(6).toString("hex"),
      });
      console.log("cus",newCustomer)

      await newCustomer.save();
      res.status(201).json({
        status: 201,
        message: "Hurray! your account is created verify your email address.",
      });
      transporter.sendMail(
        {
          to: newCustomer.email,
          subject: "Welcome " + newCustomer.fullname,
          text: "bonjour mr ",
          html: `<!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Welcome Email</title>
          </head>
          <body>
            <h2>Hello ${newCustomer.fullname}! </h2>
            <p>We're glad to have you on board at ${newCustomer.email}. </p>
            <a href="${DOMAIN}verify-now/${newCustomer.verificationCode}">Verify Email </a>
          </body>
          </html>`,
        },

        function (err, info) {
          if (err) {
            console.log("error : ", err);
          } else {
            console.log("Email sent : ", info.response);
          }
        }
      );
    } catch (err) {
      res.status(406).json({ status: 406, message: err.message });
    }
  },



  verifyEmail: async function (req, res) {
    try {
      // let verificationCode = req.params.verificationCode;
      const { verificationCode } = req.params;

      const user = await User.findOne({
        verificationCode,
      });
      // console.log(user.fullname);
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized access, Invalid verification code",
        });
      }
      user.verified = true;
      user.verificationCode = undefined;
      user.save();
      return res.sendFile(
        join(__dirname, "../Templates/verification_success.html")
      );
    } catch (error) {
      res.sendFile(join(__dirname, "../Templates/errors.html"));
    }
  },

  //function login
  Login: async function (req, res) {
    try {
      // 1 ere etape verifier email et compare password
      const { email, password } = req.body;

      const user = await User.findOne({ email, password });

      if (!user) {
        return res
          .status(404)
          .json({ status: 404, message: "email not found !" });
      }
    //   if (user.verified === true) {
    //     const passwordCompare = bcrypt.compareSync(password, user.password);
    //     if (!passwordCompare) {
    //       return res
    //         .status(404)
    //         .json({ status: 404, message: "password Incorrect !" });
    //     }
        // 2 eme etape creation de token
        const token = jwt.sign(
          {
            id: user._id,
            user: user,
          },
          //"shhhhh",
          SECRET,
          { expiresIn: "7 days" }
          /*  { expiresIn: '24h' } */
        );
        const result = {
          email: user.email,
          user: user,
          token: token,
          expiresIn: 7,
        };

        return res.status(200).json({
          ...result,
          message: "You are now logged in.",
          success: true,
        });
    //   } else {
    //     return res.status(200).json({
    //       message: "Hurray! You are not verified",
    //       success: false,
    //     });
    //  }
    } catch (error) {
      res.status(404).json({ status: 404, message: error.message });
    }
  },

  profile: async function (req, res) {
    // return res.status(404).json({ message: "this my profile" });
    try {
      const user = req.user;
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
  
//************************************** */











  //******************************** */
  resetPassword: async function (req,res,next){
    var email= req.body.email;
    console.log("email",email);
    
    await User.findOne({ email: email }).exec((err, userByemail) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "utilisateur séléctonné par email !",
          data: userByemail,
        });

        var newToken=randtoken.generate(20);
       // console.log("newtoken",newToken);
        var sent = sendEmail(email, newToken);
 
             if (sent != '0') {
 
                var data = {
                    token: newToken
                }
                User.findOneAndUpdate(email,data)
 
      }}

      
      
    });

    // await   User.findOneAndUpdate(email,newToken).exec((err,userUpdated)=>{
    //   if (err) {
    //     res.status(500).json({
    //       message: err.message,
    //       status: 500,
    //     });
    //   } else {
        
    //     res.status(200).json({
    //       status: 200,
    //       message: "email envoyé consuler email !",
    //       data: userUpdated,
    //     });
    //   }
    // });

  }
};