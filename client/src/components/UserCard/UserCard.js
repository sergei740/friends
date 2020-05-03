import React, { useContext } from "react";
import styles from "./user-card.module.css";
import _ from "lodash";
import { Context } from "../../context/Context";

export const UserCard = (props) => {
  const {
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    deleteFriend,
  } = useContext(Context);
  const { authorizedUserId } = props;
  const {
    _id,
    name,
    friendList,
    outgoingFriendRequestsList,
    incomingFriendRequestsList,
  } = props.user;
  const isFriend = friendList.includes(authorizedUserId);
  const isIncomingRequest = outgoingFriendRequestsList.includes(authorizedUserId);
  const isOutgoingRequest = incomingFriendRequestsList.includes(authorizedUserId);

  return (
    <div className={styles.userCard}>
      <div className={styles.flexContainer}>
        <img src="https://via.placeholder.com/65" alt="turkish" className={styles.photo} />
        <p className={styles.name}>{_.capitalize(name)}</p>
      </div>
      <div className={styles.buttonsContainer}>
        {isIncomingRequest && !isFriend && (
          <div>
            <button
              className="btn btn-outline-primary"
              type="button"
              style={{ marginRight: "10px" }}
              onClick={() => acceptFriendRequest(authorizedUserId, _id)}
            >
              ACCEPT
            </button>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={() => rejectFriendRequest(authorizedUserId, _id)}
            >
              REJECT
            </button>
          </div>
        )}
        {!isFriend && !isIncomingRequest && !isOutgoingRequest ? (
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={() => sendFriendRequest(authorizedUserId, _id)}
          >
            ADD FRIEND
          </button>
        ) : null}
        {isFriend && (
          <div className={styles.flexContainer}>
            <p className={styles.friend}>friend</p>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={() => deleteFriend(authorizedUserId, _id)}
            >
              REMOVE FRIEND
            </button>
          </div>
        )}
        {isOutgoingRequest && !isFriend && (
          <div className={styles.flexContainer}>
            <p className={styles.friend}>request has been sent</p>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={() => cancelFriendRequest(authorizedUserId, _id)}
            >
              CANCEL REQUEST
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
