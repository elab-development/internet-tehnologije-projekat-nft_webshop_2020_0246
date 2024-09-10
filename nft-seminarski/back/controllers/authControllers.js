const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
//catch async i treba da wrapujem catch asyncom sve ovo

//SIGNUP

exports.signup = async(req,res,next)=>{
    //const newUser = await User.create(req.body);
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIERS_IN
    });

    res.status(201).json({
        status: "Success",
        token,
        data:{
            user: newUser,
        },
    });
};

//mora catch async error
exports.login=async(req,res,next)=>{
    const {email,password} = req.body;
    console.log("aaaa");
    if(!email || !password){
        //return next(new AppError("provide email and pass"))
    }

    const user = await User.findOne({email}).select("+password");
    console.log(user);
    const token ="";
    res.status(200).json({
        status: "success",
        token,
    })
}