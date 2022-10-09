const mongoose=require("mongoose");
const stockSchema =mongoose.Schema({
    estamp:{
        type: mongoose.Types.ObjectId,
        ref:"estamps",
        //required:true
    },

    QteEstamp:{
        type:String,
        trim:true,
       // required:true
    },

    efleur:{
        type: mongoose.Types.ObjectId,
        ref:"efleur",
    },
    QteEfleur:{
        type:String,
        trim:true
    }

},
{ timestamps: true }
);
    module.exports =mongoose.model("stock", stockSchema);

