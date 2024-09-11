//------USERS
const User = require("./../models/userModel");
const APIFeatures = require("./../Utils/apiFeatures");
const cathcAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");


const filterObj = (obj,...allowedFields)=>{
  const newObj = {};
  Object.keys(obj).forEach(el=>{
    if(allowedFields.includes(el))
      newObj[el]=obj[el]
  });
  return newObj;
}

exports.updateMe = catchAsync(async(req,res,next)=>{
  //error ako menja lozinku, to se radi drugacije
  console.log(req.user);
  if(req.body.password || req.body.passwordConfirm){
    return next(new AppError("Ne moze da se menja sifra",400));
  }
  
  console.log(req.body)
  const filteredBody = filterObj(req.body,"name","email");
  console.log(req.user.id)
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidator: true,
  });

  console.log(updateUser)
  
  
  res.status(200).json({
    status: "success",
    data:{
      user: updateUser,
    }
  })
});

exports.getAllUsers = catchAsync(async(req, res) => {
  
  const users = await User.find();

  // /SEND QUERY
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });


  });
  
  exports.createUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
  
  exports.getSingleUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
  
  exports.updateUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
  
  exports.deleteUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };