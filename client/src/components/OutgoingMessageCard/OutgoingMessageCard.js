import React from "react";
import styles from "./outgoing-message-card.module.css";
import _ from "lodash";

export const OutgoingMessageCard = (props) => {
  const { id, name, photo, message, date } = props.user;
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
