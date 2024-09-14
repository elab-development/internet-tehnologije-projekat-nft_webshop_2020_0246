import React, { useState } from "react";
import Image from "next/image";

//INTERNALIMPORT
import Style from "./signUp.module.css";
import images from "../img";
import { Button } from "../components/componentindex";

const signUp = ({userSignup}) => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [passwordConfirm,setPasswordConfirm] = useState("")


  return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_input}>

          <div className={Style.user_box_input_box}>
            <label htmlFor="name">Ime</label>
            <input type="name" placeholder="vanja" onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className={Style.user_box_input_box}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="example@emample.com" onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className={Style.user_box_input_box}>
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Lozinka</p>
              
            </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className={Style.user_box_input_box}>
            <label
              htmlFor="passwordConfirm"
              className={Style.user_box_input_box_label}
            >
              <p>Potvrdite lozinku</p>
              
            </label>
            <input type="password" onChange={(e) => setPasswordConfirm(e.target.value)}/>
          </div>
        </div>

        <Button btnName="Continue" classStyle={Style.button} handleClick={()=>userSignup(name,email,password,passwordConfirm)} />
      </div>
    </div>
  );
};

export default signUp;