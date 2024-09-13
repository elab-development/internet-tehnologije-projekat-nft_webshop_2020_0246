import React, { useState } from "react";
import Image from "next/image";

//INTERNALIMPORT
import Style from "./signUp.module.css";
import images from "../img";
import { Button } from "../components/componentindex";

const signUp = () => {
  const [activeBtn, setActiveBtn] = useState(1);


  return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_input}>

          <div className={Style.user_box_input_box}>
            <label htmlFor="name">Ime</label>
            <input type="name" placeholder="vanja" />
          </div>

          <div className={Style.user_box_input_box}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="example@emample.com" />
          </div>

          <div className={Style.user_box_input_box}>
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Lozinka</p>
              
            </label>
            <input type="password" />
          </div>

          <div className={Style.user_box_input_box}>
            <label
              htmlFor="passwordConfirm"
              className={Style.user_box_input_box_label}
            >
              <p>Potvrdite lozinku</p>
              
            </label>
            <input type="password" />
          </div>
        </div>

        <Button btnName="Continue" classStyle={Style.button} />
      </div>
    </div>
  );
};

export default signUp;