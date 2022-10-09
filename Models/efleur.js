const { default: mongoose }= require ("mongoose");
const SchemaEfleur = new mongoose.Schema (
    {
    nom: {
    type :String,
    //srequired:true,
    trim: true,
        },
            photo:{
            type: String,
            //required:true,
            //trim: true,
                },
  
        description: {
            type :String,
          //  Required : true,
        },
        etatProduct:{ type: String, default: 'NON' },
    QunatityEfleurDisponible:{
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    }
    
},
{ timeefleur: true }
);
    module.exports =mongoose.model("efleur", SchemaEfleur);