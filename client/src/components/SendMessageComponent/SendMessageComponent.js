import React, { useState, useContext } from "react";
import styles from "./send-message-component.module.css";
import { TextField } from "../TextField/TextField";
import { Context } from "../../context/Context";

export const SendMessageComponent = (props) => {
  const { setMessageComponent, id } = props;
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useContext(Context);

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const message = async () => {
    await sendMessage(inputValue, id);
    setInputValue("");
  };

  return (
    <div className={styles.container}>
      <TextField value={inputValue} placeholder="Type your message" onChange={inputHandler} />
      <button className="btn btn-primary" type="button" disabled={!inputValue} onClick={message}>
        SEND
      </button>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => {
          setMessageComponent(false);
        }}
      >
        BACK
      </button>
    </div>
  );
};
