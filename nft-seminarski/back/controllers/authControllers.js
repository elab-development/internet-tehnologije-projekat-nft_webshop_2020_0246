const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const {promisify} = require("util");

//create token
const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
}


//SIGNUP
exports.signup = catchAsync(async(req,res,next)=>{
    const newUser = await User.create(req.body);
    /*const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    })*/

    const token = signToken(newUser._id);

    res.status(201).json({
        status: "Success",
        token,
        data:{
            user: newUser,
        },
    });
});

//mora catch async error
exports.login=catchAsync(async(req,res,next)=>{
    const {email,password} = req.body;
    //console.log("aaaa");
    if(!email || !password){
        return next(new AppError("Morate uneti oba parametra"));
    }

    const user = await User.findOne({email}).select("+password");
    console.log(user);

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError("Neispravni parametri",401));
    }

    const token =signToken(user.id);
    res.status(200).json({
        status: "success",
        token,
    })
});

//protecting data
exports.protect = catchAsync(async(req,res,next)=>{
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        //console.log(token);
    }
    //check token postoji
    if(!token){
       return next(new AppError("Niste ulogovani"),404); 
    }
    //validiramo korisnika
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //console.log(decoded);
    //da li i dalje posotji
    const freshUser = User.findById(decoded.id);
    //da li je menjao sifru
    if(!freshUser){
        return next(new AppError("Korisnik vise ne postoji",401));
    }
    //if(freshUser.changedPasswordAfter(decoded.iat)){
    //    return next(new AppError("Korisnik je nedavno promenio lozinku", 401));
    //};
    req.user=freshUser;
    next();
})

exports.restrictTo = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new AppError("Nemate pristup brisanju NFT-a",403)
            );
        }
        next();
    }
}

exports.forgotPassword = catchAsync(async(req,res,next)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new AppError("Nema korisnika sa ovim mejlom",404));
    }
    const resetToken = user.createPasswordResetToken();
    console.log(resetToken)
    await user.save({validateBeforeSave: false});
});

exports.resetPassword = catchAsync(async(req,res,next)=>{

});
