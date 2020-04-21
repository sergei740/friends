import React, { useContext } from "react";
import styles from "./registration-form-component.module.css";
import { Context } from "../../context/Context";
import { TextField } from "../TextField/TextField";

export const RegistrationFormComponent = () => {
  const { changeComponentName } = useContext(Context);

  return (
    <div className={styles.mainContainer}>
      <form className={styles.formStyle}>
        <TextField type="text" placeholder="type your name" />
        <TextField type="email" placeholder="type your email" />
        <TextField type="text" placeholder="type your login" />
        <TextField type="password" placeholder="type your password" />
        <div className={styles.buttonContainer}>
          <button className="btn btn-outline-primary">REGISTRATION</button>
          <button className="btn btn-outline-danger" onClick={changeComponentName}>
            GO BACK
          </button>
        </div>
      </form>
    </div>
  );
};
