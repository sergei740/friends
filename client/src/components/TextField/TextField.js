import React from "react";
import styles from "./text-field.module.css";

export const TextField = (props) => {
  const { type, placeholder } = props;

  return (
    <>
      <input className={styles.inputStyle} type={type} placeholder={placeholder} />
    </>
  );
};
