import React, { useState } from "react";
import styles from "./alert.module.css";

export const Alert = (props) => {
  const { message } = props;
  const [state, setState] = useState(true);

  return (
    <div
      className={state ? styles.alertSuccess : styles.hide}
      onClick={() => {
        setState("hide");
      }}
    >
      <div>{message}</div>
    </div>
  );
};
