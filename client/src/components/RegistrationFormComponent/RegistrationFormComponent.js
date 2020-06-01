import React, { Fragment, useContext, useState, useEffect } from "react";
import styles from "./registration-form-component.module.css";
import fadeTransition from "./transitions/fade.module.css";
import slideFromTopTransition from "./transitions/slide-from-top.module.css";
import { Context } from "../../context/Context";
import { TextField } from "../TextField/TextField";
import { Alert } from "../Alert/Alert";
import { CSSTransition } from "react-transition-group";

export const RegistrationFormComponent = () => {
  const {
    changeComponentName,
    registrationForm,
    handleRegistrationForm,
    submitRegistrationForm,
    loading,
    submitFormData,
  } = useContext(Context);

  const [animation, setAnimation] = useState(false);
  const registrationFormFieldsIsNotEmpty =
    registrationForm.name &&
    registrationForm.email &&
    registrationForm.login &&
    registrationForm.password;

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <Fragment>
      {(submitFormData.error && <Alert message={submitFormData.message} type="error" />) ||
        (!submitFormData.error && submitFormData.message && (
          <Alert message={submitFormData.message} type="succes" />
        ))}
      <div className={styles.mainContainer} onSubmit={submitRegistrationForm}>
        <form className={styles.formStyle}>
          <CSSTransition
            in={animation}
            timeout={1500}
            classNames={slideFromTopTransition}
            mountOnEnter
            unmountOnExit
          >
            <div className={styles.textFieldsContainer}>
              <TextField
                type="text"
                value={registrationForm.name}
                name="name"
                placeholder="type your name"
                onChange={handleRegistrationForm}
              />
              <TextField
                type="email"
                value={registrationForm.email.toLowerCase()}
                name="email"
                placeholder="type your email"
                onChange={handleRegistrationForm}
              />
              <TextField
                type="text"
                value={registrationForm.login}
                name="login"
                placeholder="type your login"
                onChange={handleRegistrationForm}
              />
              <TextField
                type="password"
                value={registrationForm.password}
                name="password"
                placeholder="type your password"
                onChange={handleRegistrationForm}
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
                disabled={loading || !registrationFormFieldsIsNotEmpty}
              >
                REGISTRATION
              </button>
              {loading && (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <button
                className="btn btn-danger"
                type="button"
                disabled={loading}
                onClick={changeComponentName}
              >
                GO BACK
              </button>
            </div>
          </CSSTransition>
        </form>
      </div>
    </Fragment>
  );
};
