import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./friends-page.module.css";
import { Context } from "../../context/Context";
import { UserCard } from "../../components/UserCard/UserCard";

export const FriendsPage = () => {
  const { users, authorizedUserId, getUsers } = useContext(Context);
  const [friends, setFriends] = useState([]);
  const [incomingFriendsRequests, setIncomingFriendsRequests] = useState([]);
  const [outgoingFriendRequestsList, setOutgoingFriendRequestsList] = useState([]);

  const { current: usrs} = useRef(users);

  useEffect(() => {
    getUsers();
    if (usrs.length) {
      setFriends(usrs.filter((user) => user.friendList.includes(authorizedUserId)));
      setIncomingFriendsRequests(
        usrs.filter((user) => user.outgoingFriendRequestsList.includes(authorizedUserId))
      );
      setOutgoingFriendRequestsList(
        usrs.filter((user) => user.incomingFriendRequestsList.includes(authorizedUserId))
      );
    }
  }, [getUsers, authorizedUserId, usrs]);

  useEffect(() => {
    if (users.length) {
      setFriends(users.filter((user) => user.friendList.includes(authorizedUserId)));
      setIncomingFriendsRequests(
        users.filter((user) => user.outgoingFriendRequestsList.includes(authorizedUserId))
      );
      setOutgoingFriendRequestsList(
        users.filter((user) => user.incomingFriendRequestsList.includes(authorizedUserId))
      );
    }
  }, [users, authorizedUserId]);

  return (
    <div className={styles.container}>
      {!friends.length && !incomingFriendsRequests.length && !outgoingFriendRequestsList.length ? (
        <p className={styles.headerText}>You haven't friends or friend request</p>
      ) : null}

      {friends.length ? (
        <div>
          <p className={styles.headerText}>Your Friends</p>
          {friends.map((friend) => (
            <UserCard key={friend._id} authorizedUserId={authorizedUserId} user={friend} />
          ))}
        </div>
      ) : null}

      {incomingFriendsRequests.length ? (
        <div>
          <p className={styles.headerText}>Incoming Friends Request</p>
          {incomingFriendsRequests.map((user) => (
            <UserCard key={user._id} authorizedUserId={authorizedUserId} user={user} />
          ))}
        </div>
      ) : null}

      {outgoingFriendRequestsList.length ? (
        <div>
          <p className={styles.headerText}>Outgoing Friends Request</p>
          {outgoingFriendRequestsList.map((user) => (
            <UserCard key={user._id} authorizedUserId={authorizedUserId} user={user} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
