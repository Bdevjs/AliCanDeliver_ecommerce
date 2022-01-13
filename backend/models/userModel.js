//Step 1 -> st-2(userController.js)
const mongoose = require("mongoose");
const validator =  require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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

    createdAt: {
        type: Date,
        default : Date.now,
    },

    role: {
        type :String,
        default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,


});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password,10)  //we can't (this) word into arrow function 
});

// User token or JWT Token

userSchema.methods.getJWTToken = function (){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};


//Compare Password

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
   
};

//Generating password token reset (Time : 2:51:19)
 userSchema.methods.getResetPasswordTokern = function () {

    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding resrt passwordtoken to userschema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
 };



module.exports = mongoose.model("User",userSchema);