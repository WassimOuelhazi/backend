const { default: mongoose } = require("mongoose");
const schemaUser = new mongoose.Schema(
  {
    nom: {
      type: String,
      trim: true,
    },

    adresse: {
      type: String,
  
    },
   tel: {
      type: Number,
      
  
    },
    email: {
      type: String,
      // required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    role: {
      type: String,
      trim: true,
    },
   // image:{type:String},
    token: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", schemaUser);







