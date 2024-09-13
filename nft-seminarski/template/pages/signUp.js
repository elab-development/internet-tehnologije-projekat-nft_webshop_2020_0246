import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import SignUp from "../signUp/signUp";

const signUp = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Registracija</h1>
        <SignUp />
        
      </div>
    </div>
  );
};

export default signUp;