const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
        passwordResetToken: String,
        passwordResetExpires: Date,
        active:{
            type: Boolean,
            default:true,
            select:false,
        }
        
        
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

userSchema.pre(/^find/, function(next){
    this.find({active:{$ne:false}});
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


userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex")

    this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.passwordResetExpires = Date.now()+10*60*1000;
    return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;


