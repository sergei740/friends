import React, { useContext, useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import fadeTransition from "./transitions/fade.module.css";
import styles from "./friends-page.module.css";
import { Context } from "../../context/Context";
import { UserCard } from "../../components/UserCard/UserCard";

export const FriendsPage = () => {
  const { users, authorizedUser, getUsers, token } = useContext(Context);
  const [friends, setFriends] = useState([]);
  const [incomingFriendsRequests, setIncomingFriendsRequests] = useState([]);
  const [outgoingFriendRequestsList, setOutgoingFriendRequestsList] = useState([]);
  const [animation, setAnimation] = useState(false);

  const { current: usrs } = useRef(users);

  useEffect(() => {
    setAnimation(true);
  }, []);

  useEffect(() => {
    getUsers(token);
    if (usrs.length) {
      setFriends(usrs.filter((user) => user.friendList.includes(authorizedUser.id)));
      setIncomingFriendsRequests(
        usrs.filter((user) => user.outgoingFriendRequestsList.includes(authorizedUser.id))
      );
      setOutgoingFriendRequestsList(
        usrs.filter((user) => user.incomingFriendRequestsList.includes(authorizedUser.id))
      );
    }
  }, [getUsers, token, authorizedUser.id, usrs]);

  useEffect(() => {
    if (users.length) {
      setFriends(users.filter((user) => user.friendList.includes(authorizedUser.id)));
      setIncomingFriendsRequests(
        users.filter((user) => user.outgoingFriendRequestsList.includes(authorizedUser.id))
      );
      setOutgoingFriendRequestsList(
        users.filter((user) => user.incomingFriendRequestsList.includes(authorizedUser.id))
      );
    }
  }, [users, authorizedUser.id]);

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
