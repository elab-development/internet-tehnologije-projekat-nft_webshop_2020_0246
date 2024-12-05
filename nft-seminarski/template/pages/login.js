import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import LoginAndSignUp from "../loginAndSignUp/loginAndSignUp";
import axios from "axios";


const userLogin = async (email,password)=>{
  //e.preventDefault();
  try{
    //setLoading(true);
    const res = await axios({
      method:"POST",
      url: "api/v1/users/login",
      withCredentials:true,
      data: {
        email, password,
      }
    });
    if(res.data.status==="success"){
      
      console.log("Ulogovali ste se uspesno");
      const cookies = document.cookie;  
      console.log("Cookies: ", cookies);
    }else{
      console.log("Neuspesno logovanje")
    }
  } catch(err){
      console.log(err);
  }
};


const login = () => {
  return (
    
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Prijava</h1>
        <LoginAndSignUp userLogin={userLogin} />
        <p className={Style.login_box_para}>
          Novi korisnik? <a href="/signUp">Napravite nalog</a>
        </p>
      </div>
    </div>
    
  );
};

export default login;