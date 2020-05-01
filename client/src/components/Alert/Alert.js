import React, { useState } from "react";
import styles from "./alert.module.css";

export const Alert = (props) => {
  const { message, type } = props;
  const [alertType, setAlertType] = useState(type);

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

  return (
    <div
      className={style(alertType)}
      onClick={() => {
        setAlertType("hide");
      }}
    >
      <div>{message}</div>
    </div>
  );
};
