import React, { useEffect, useState, useContext } from "react";
import styles from "./message-page.module.css";
import { CSSTransition } from "react-transition-group";
import fadeTransition from "./transitions/fade.module.css";
import { Context } from "../../context/Context";
import { IncomingMessageCard } from "../../components/IncomingMessageCard/IncomingMessageCard";
import { OutgoingMessageCard } from "../../components/OutgoingMessageCard/OutgoingMessageCard";

export const MessagesPage = () => {
  const { getMessages, incomingMessages, outgoingMessages, token } = useContext(Context);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    getMessages(token);
    setAnimation(true);
  }, [getMessages, token]);

  useEffect(() => {}, [incomingMessages]);

  return (
    <CSSTransition
      in={animation}
      timeout={1000}
      classNames={fadeTransition}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.container}>
        <p className={styles.headerText}>Incoming Messages</p>
        <div style={{ listStyle: "none" }}>
          {incomingMessages.length ? (
            incomingMessages.map((user, index) => <IncomingMessageCard key={index} user={user} />)
          ) : (
            <p style={{color:'#ffffff', marginBottom:'10px'}}>You haven't incoming messages</p>
          )}
        </div>
        <p className={styles.headerText}>Outgoing Messages</p>
        <div style={{ listStyle: "none" }}>
          {outgoingMessages.length ? (
            outgoingMessages.map((user, index) => <OutgoingMessageCard key={index} user={user} />)
          ) : (
            <p style={{color:'#ffffff', marginBottom:'10px'}}>You haven't incoming messages</p>
          )}
        </div>
      </div>
    </CSSTransition>
  );
};
