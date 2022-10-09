const { default: mongoose } = require("mongoose");
const schemaCategorie = new mongoose.Schema(
  {
    annee: {
      type: String,
      trim: true,
    },
    theme: {
      type: String,
      trim: true,
    },
    artiste: {
      type: String,
      trim: true,
    },

    forme: {
        type: String,
        trim: true,
      },
    prix : {
        type: String,
        trim: true,
      },
  },
  { timestamps: true }
);
module.exports = mongoose.model("categorie", schemaCategorie);







