import React, { useContext } from "react";
import styles from "./sign-in-form-component.module.css";
import { Context } from "../../context/Context";
import { TextField } from "../TextField/TextField";

export const SignInFormComponent = () => {
  const { changeComponentName, signInForm, handleSignInForm, submitSignInForm } = useContext(
    Context
  );

  return (
    <div className={styles.mainContainer}>
      <form className={styles.formStyle} onSubmit={submitSignInForm}>
        <TextField
          type="email"
          name="email"
          placeholder="type your email"
          value={signInForm.email}
          onChange={handleSignInForm}
        />
        <TextField
          type="password"
          name="password"
          placeholder="type your password"
          value={signInForm.password}
          onChange={handleSignInForm}
        />
        <div className={styles.buttonContainer}>
          <button className="btn btn-outline-primary" type="submit">
            SIGN IN
          </button>
          <button className="btn btn-outline-danger" type="button" onClick={changeComponentName}>
            GO BACK
          </button>
        </div>
      </form>
    </div>
  );
};
