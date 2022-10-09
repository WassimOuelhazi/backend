const { default: mongoose }= require ("mongoose");
const schemaEstamps = new mongoose.Schema (
    {
    sujet : {
    type :String,
    //srequired:true,
    trim: true,
        },

        photo:{
    type: String,
    required:true,
    //trim: true,
   
        },
    reference:{
      type :String,

     },
    format: {
        type: String,
       // Required:true,
        trim: true,
    },
    dateEmission: {
    Type: String,
    },
    serie:{
        Type: String ,
        },

    artiste: {
        type : String,
       // required:true,
        trim: true,
    
    },
    // prix : {
    //     type :String,
    //   //  Required : true,
    // },
    categorie:{
       type:mongoose.Types.ObjectId,
       ref:"categorie"
    },
    etatProduct:{ type: String, default: 'NON' },
    //Ajouter la quantité disponible pour chaque object créer et pour le prix est ajouté dans le product
    QunatityEstampDisponible:{
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    }
},
{ timestamps: true }
);
    module.exports =mongoose.model("estamps", schemaEstamps);