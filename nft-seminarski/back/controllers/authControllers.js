const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

//create token
const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
}


//SIGNUP
exports.signup = catchAsync(async(req,res,next)=>{
    //const newUser = await User.create(req.body);
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

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