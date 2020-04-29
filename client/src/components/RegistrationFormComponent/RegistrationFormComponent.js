import React, { useContext } from "react";
import styles from "./registration-form-component.module.css";
import { Context } from "../../context/Context";
import { TextField } from "../TextField/TextField";
import { Alert } from "../Alert/Alert";

export const RegistrationFormComponent = () => {
  const {
    changeComponentName,
    registrationForm,
    handleRegistrationForm,
    submitRegistrationForm,
    loading,
    submitFormMessage,
  } = useContext(Context);

  const { message } = submitFormMessage;

  return (
    <div className={styles.mainContainer} onSubmit={submitRegistrationForm}>
      {message && <Alert message={message} />}
      <form className={styles.formStyle}>
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
        <div className={styles.buttonContainer}>
          <button className="btn btn-outline-primary" type="submit" disabled={loading}>
            REGISTRATION
          </button>
          {loading && (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <button
            className="btn btn-outline-danger"
            type="button"
            disabled={loading}
            onClick={changeComponentName}
          >
            GO BACK
          </button>
        </div>
      </form>
    </div>
  );
};
