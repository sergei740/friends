import React, { useContext, useState, useEffect, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./sign-in-form-component.module.css";
import fadeTransition from "./transitions/fade.module.css";
import slideFromTopTransition from "./transitions/slide-from-top.module.css";
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

  const [animation, setAnimation] = useState(false);
  const signInFormFieldsIsNotEmpty = signInForm.email && signInForm.password;

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <Fragment>
      {(submitFormData.error && <Alert message={submitFormData.message} type="error" />) ||
        (!submitFormData.error && submitFormData.message && (
          <Alert message={submitFormData.message} type="succes" />
        ))}
      <div className={styles.mainContainer}>
        <form className={styles.formStyle} onSubmit={submitSignInForm}>
          <CSSTransition
            in={animation}
            timeout={1500}
            classNames={slideFromTopTransition}
            mountOnEnter
            unmountOnExit
          >
            <div className={styles.textFieldsContainer}>
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
            </div>
          </CSSTransition>
          <CSSTransition
            in={animation}
            timeout={1500}
            classNames={fadeTransition}
            mountOnEnter
            unmountOnExit
          >
            <div className={styles.buttonContainer}>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={!signInFormFieldsIsNotEmpty}
              >
                SIGN IN
              </button>
              {loading && (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <button className="btn btn-danger" type="button" onClick={changeComponentName}>
                GO BACK
              </button>
            </div>
          </CSSTransition>
        </form>
      </div>
    </Fragment>
  );
};
