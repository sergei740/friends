import React, { useState, useContext } from "react";
import styles from "./incoming-message-card.module.css";
import _ from "lodash";
import { SendMessageComponent } from "../SendMessageComponent/SendMessageComponent";
import { Context } from "../../context/Context";

export const IncomingMessageCard = (props) => {
  const { id, name, message, date } = props.user;
  const { users } = useContext(Context);
  const [messageComponent, setMessageComponent] = useState(false);

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
            <div className={styles.name}>{_.capitalize(name)}:</div>
            <div className={styles.message}>{message}</div>
          </div>
        </div>
        {messageComponent ? (
          <SendMessageComponent setMessageComponent={setMessageComponent} id={id} />
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={styles.date}>{date}</div>
            <button
              className="btn btn-success"
              onClick={() => {
                setMessageComponent(true);
              }}
            >
              UNSWER
            </button>
          </div>
        )}
      </div>
    </li>
  );
};
