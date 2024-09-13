import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import LoginAndSignUp from "../loginAndSignUp/loginAndSignUp";

const login = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Prijava</h1>
        <LoginAndSignUp />
        <p className={Style.login_box_para}>
          Novi korisnik? <a href="/signUp">Napravite nalog</a>
        </p>
      </div>
    </div>
  );
};

export default login;