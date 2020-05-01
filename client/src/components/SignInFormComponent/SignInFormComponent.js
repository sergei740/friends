import React, { useContext } from "react";
import styles from "./sign-in-form-component.module.css";
import { Context } from "../../context/Context";
import { TextField } from "../TextField/TextField";
import { Alert } from "../Alert/Alert";

export const SignInFormComponent = () => {
  const {
    changeComponentName,
    signInForm,
    handleSignInForm,
    submitSignInForm,
    loading,
    submitFormData,
  } = useContext(Context);

  return (
    <>
      {(submitFormData.error && <Alert message={submitFormData.message} type="error" />) ||
        (!submitFormData.error && submitFormData.message && (
          <Alert message={submitFormData.message} type="succes" />
        ))}
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
            {loading && (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            <button className="btn btn-outline-danger" type="button" onClick={changeComponentName}>
              GO BACK
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
