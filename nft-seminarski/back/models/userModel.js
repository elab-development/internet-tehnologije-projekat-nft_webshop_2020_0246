const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"Morate uneti ime"]
        },
        email:{
            type: String,
            required: [true, "Morate uneti email"],
            unique: true,
            lowecase: true,
            validator: [validator.isEmail, "Molimo vas unesite email"]
        },
        photo:{
            type: String,
        },
        role:{
            type: String,
            enum: ["user","creator","admin","guide"],
            default: "user"
        },
        password:{
            type: String,
            required: [true, "Morate uneti lozinku"],
            minlength: 8,
            select: false,

        },
        passwordConfirm:{
            type: String,
            required: [true,"Molimo vas potvrdite lozinku"],
            validate:{
                validator: function(el){
                    return el === this.password
                },
                message: "Lozinke nisu iste"
            }
        },
        passwordChangedAt: Date,
        
        
    }
);


//ovo isto treba da bude async
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    //enkripcija
    this.password = await bcrypt.hash(this.password,12);

    this.passwordConfirm=undefined;
    next();
})


userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
){
    return await bcrypt.compare(candidatePassword,userPassword);
}


userSchema.methods.changedPasswordAfter = function (JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTTimestamp<changedTimeStamp;
        //console.log(changedTimeStamp,JWTTimestamp);
    }
    //po difoltu false
    return false;
}




const User = mongoose.model("User", userSchema);

module.exports = User;


