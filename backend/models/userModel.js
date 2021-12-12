const mongoose = require("mongoose");
const validator =  require("validator");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Nama"],
        maxLength:[30,"Name cannot exceed 30 character"],
        minlength:[4,"Name should have more than 4  character"]

    },

    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"please Enter a valid email"]
    },

    password:{
        type:String,
        required:[true,"please Enter your password"],
        minlength:[8,"Password should be greater than 8 cahracter"],
        select:false, //its because of when some one search data in database all information will come out, with out password.
    },

    avatar:{

        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },

    role: {
        type :String,
        default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,


});

module.exports = mongoose.model("User",userSchema);