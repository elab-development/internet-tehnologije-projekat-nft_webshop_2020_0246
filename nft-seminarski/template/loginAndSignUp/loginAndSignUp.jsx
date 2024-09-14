import React, { useState } from "react";
import Image from "next/image";

//INTERNALIMPORT
import Style from "./loginAndSignUp.module.css";
import images from "../img";
import { Button } from "../components/componentindex";

const loginAndSignUp = ({userLogin}) => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_input}>
          <div className={Style.user_box_input_box}>
            <label htmlFor="email">Email</label>
            <input type="email" 
            placeholder="example@emample.com"
            onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={Style.user_box_input_box}>
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label
                
              }
            >
              <p>Lozinka</p>
              <p>
                <a href="#">Zaboravili lozinku?</a>
              </p>
            </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>

        <Button btnName="Continue" handleClick={()=>userLogin(email,password)} classStyle={Style.button} />
      </div>
    </div>
  );
};

export default loginAndSignUp;