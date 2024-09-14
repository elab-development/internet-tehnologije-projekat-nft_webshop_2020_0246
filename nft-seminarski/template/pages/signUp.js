import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import SignUp from "../signUp/signUp";
import axios from "axios";


const userSignup = async (name,email,password,passwordConfirm)=>{
  //e.preventDefault();
  try{
    //setLoading(true);
    const res = await axios({
      method:"POST",
      url: "api/v1/users/signup",
      //withCredentials:true,
      data: {
        name,email, password,passwordConfirm,
      }
    });
    if(res.data.status==="Success"){
      //setSuccessMessage("Ulogovali ste se uspesno");
      //dispatchEvent(selectCurrentState(res.data.data.user));
      //setLoading(false);
      //setOpenNotice(true);
      //window.setTimeout(()=>{
      //  location.reload(true);
      //},1500)
      console.log("Registrovali ste se uspesno");
    }else{
      console.log("Neuspesna registracija")
    }
  } catch(err){
      console.log(err);
  }
};




const signUp = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Registracija</h1>
        <SignUp userSignup={userSignup}/>
        
      </div>
    </div>
  );
};

export default signUp;