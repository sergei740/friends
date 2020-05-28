import React, { useContext } from "react";
import styles from "./outgoing-message-card.module.css";
import _ from "lodash";
import { Context } from "../../context/Context";

export const OutgoingMessageCard = (props) => {
  const { id, name, message, date } = props.user;
  const { users } = useContext(Context);

  const photo = users.find((user) => user._id === id).photo;

  return (
    <li>
      <div className={styles.container}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            className={styles.photo}
            src={photo ? `/api/file/${photo}` : `https://via.placeholder.com/65`}
            alt={name}
          />
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div className={styles.name}>{`to: ${_.capitalize(name)} message:`}</div>
            <div className={styles.message}>{message}</div>
            <div className={styles.date}>{date}</div>
          </div>
        </div>
      </div>
    </li>
  );
};
