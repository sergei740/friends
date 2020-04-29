import React from "react";
import styles from "./user-info-component.module.css";

export const UserInfoComponent = (props) => {
  const { userName } = props;

  return (
    <div className={styles.container}>
      <div>
        <img src="https://via.placeholder.com/65" className={styles.photoBlock} alt="" />
      </div>
      <div>{userName}</div>
    </div>
  );
};
