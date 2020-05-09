import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./alert.module.css";
import fadeTransition from "./transitions/fade.module.css";

export const Alert = (props) => {
  const { message, type } = props;
  const [alertType, setAlertType] = useState(type);
  const [animation, setAnimation] = useState(false);

  const style = (alertType) => {
    switch (alertType) {
      case "succes":
        return styles.alertSuccess;
      case "hide":
        return styles.hide;
      case "error":
        return styles.alertError;
      default:
        return styles.alertSuccess;
    }
  };

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <CSSTransition
      in={animation}
      timeout={1000}
      classNames={fadeTransition}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={style(alertType)}
        onClick={() => {
          setAlertType("hide");
        }}
      >
        <div>{message}</div>
      </div>
    </CSSTransition>
  );
};
