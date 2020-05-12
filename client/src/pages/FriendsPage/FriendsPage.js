import React, { useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import fadeTransition from "./transitions/fade.module.css";
import styles from "./friends-page.module.css";
import { Context } from "../../context/Context";
import { UserCard } from "../../components/UserCard/UserCard";

export const FriendsPage = () => {
  const {
    authorizedUser,
    token,
    getFriends,
    friends,
    incomingFriendsRequests,
    outgoingFriendRequestsList,
  } = useContext(Context);

  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
    getFriends(token);
  }, [getFriends, token]);

  return (
    <CSSTransition
      in={animation}
      timeout={1000}
      classNames={fadeTransition}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.container}>
        {!friends.length &&
        !incomingFriendsRequests.length &&
        !outgoingFriendRequestsList.length ? (
          <p className={styles.headerText}>You haven't friends or friend request</p>
        ) : null}

        {friends.length ? (
          <div>
            <p className={styles.headerText}>Your Friends</p>
            {friends.map((friend) => (
              <UserCard key={friend._id} authorizedUserId={authorizedUser.id} user={friend} />
            ))}
          </div>
        ) : null}

        {incomingFriendsRequests.length ? (
          <div>
            <p className={styles.headerText}>Incoming Friends Request</p>
            {incomingFriendsRequests.map((user) => (
              <UserCard key={user._id} authorizedUserId={authorizedUser.id} user={user} />
            ))}
          </div>
        ) : null}

        {outgoingFriendRequestsList.length ? (
          <div>
            <p className={styles.headerText}>Outgoing Friends Request</p>
            {outgoingFriendRequestsList.map((user) => (
              <UserCard key={user._id} authorizedUserId={authorizedUser.id} user={user} />
            ))}
          </div>
        ) : null}
      </div>
    </CSSTransition>
  );
};
