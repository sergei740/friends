import React, { Fragment } from "react";
import styles from "./text-field.module.css";

export const TextField = (props) => {
  const { type, name, placeholder, value, onChange } = props;

  return (
    <Fragment>
      <input
        className={styles.inputStyle}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Fragment>
  );
};
