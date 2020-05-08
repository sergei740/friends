import React, { useContext, useState, useEffect } from "react";
import styles from "./start-page-component.module.css";
import { Context } from "../../context/Context";
import { CSSTransition } from "react-transition-group";

export const StartPageComponent = () => {
  const { changeComponentName } = useContext(Context);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div>
        <CSSTransition in={fade} timeout={3000} classNames="my-node" unmountOnExit>
          <div className={styles.textContainer}>
            <p className={styles.text}>join to the</p>
            <h1>FRIENDS</h1>
          </div>
        </CSSTransition>
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
