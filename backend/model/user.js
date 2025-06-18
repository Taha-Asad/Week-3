const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            require: [true , "Please proide a name!"],
            trim: true,
            minlength:[3 , "Name must be at least 3 chracters long"],
            maxlength:[50 , "Name must be at least 3 chracters long"],
        },
        email:{
            type: String,
            required:[true , "Please Provide an Email!"],
            trim:true,
            lowercase:true,
            unique:true,
            // match: [],
        },
        // avatar:{

        // },
        password:{
            type:String,
            required:[true , "Provide Password"],
            minlength:[6 , "The password must be at least 6 characters long"]
        },
        // address:{

        // }, 
        // phoneNo:{

        // },
        role:{
            type:Number,
            default: 0,  // 0 means user 
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User" , userSchema);