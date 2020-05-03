import React from "react";
import styles from "./user-info-component.module.css";
import _ from "lodash";

export const UserInfoComponent = (props) => {
  const { userName } = props;

  return (
    <div className={styles.container}>
      <div>
        <img src="https://via.placeholder.com/65" className={styles.photoBlock} alt="" />
      </div>
      <div>{_.capitalize(userName)}</div>
    </div>
  );
};
