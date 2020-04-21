import React, { useContext } from "react";
import styles from "./start-page-component.module.css";
import { Context } from "../../context/Context";

export const StartPageComponent = () => {
  const { changeComponentName } = useContext(Context);

  return (
    <div className={styles.mainContainer}>
      <div>
        <div className={styles.textContainer}>
          <p className={styles.text}>join to the</p>
          <h1>FRIENDS</h1>
        </div>
        <div className={styles.buttonsContainer}>
          <button
            name="singin"
            type="button"
            className="btn btn-outline-primary"
            onClick={changeComponentName}
          >
            SIGN IN
          </button>
          <p className={styles.text}>or</p>
          <button
            name="registartion"
            type="button"
            className="btn btn-outline-danger"
            onClick={changeComponentName}
          >
            REGISTRATION
          </button>
        </div>
      </div>
    </div>
  );
};
