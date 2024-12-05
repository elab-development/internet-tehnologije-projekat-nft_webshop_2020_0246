const crypto = require("crypto");
const {promisify} = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const sendEmail = require ("../Utils/email");


//create token
const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
}
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.cookie("jwt", token, cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        }
    });
};

// SIGNUP
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
});

// LOGIN
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 200, res);
});


exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({ status: 'success' });
};

//protecting data
exports.protect = catchAsync(async(req,res,next)=>{
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        console.log(token);
    }
    //check token postoji
    if(!token){
       return next(new AppError("Niste ulogovani"),404); 
    }
    //validiramo korisnika
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //console.log(decoded);
    //da li i dalje posotji
    const freshUser = await User.findById(decoded.id);
    //da li je menjao sifru
    if(!freshUser){
        return next(new AppError("Korisnik vise ne postoji",401));
    }
    //if(freshUser.changedPasswordAfter(decoded.iat)){
    //    return next(new AppError("Korisnik je nedavno promenio lozinku", 401));
    //};
    req.user=freshUser;
    //console.log(req.user);
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
    //kreiramo random token
    const resetToken = user.createPasswordResetToken();
    //console.log(resetToken)
    //slanje mejla
    const resetURL=`${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Zaboravili ste lozinku? Posaljite zahtev sa novom lozinkom na url ${resetURL}.`
    
    try{
        await sendEmail({
            email: user.email,
            subject: "Token za promenu lozinke (validan 10min)",
            message,
        });
        res.status(200).json({
            status: "success",
            message: "Token poslat na mejl"
        })
    }catch(error){
        user.createPasswordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});
        return next(new AppError("Greska u slanju mejla",500));
    }
    
    
});

exports.resetPassword = catchAsync(async(req,res,next)=>{
    //get user on token
    const hashedToken = crypto.createHash("sha256")
    .update(req.params.token).digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now}
    })
    //if token not expired
    if(!user){
        return next(new AppError("Ovakav korisnik ne postoji",400));
    }
    //update
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    
    //log user in app
    const token =signToken(user.id);
    res.status(200).json({
        status: "success",
        token,
    })
});
