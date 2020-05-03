import React, { useContext, useEffect } from "react";
import styles from "./user-page.module.css";
import { TextField } from "../../components/TextField/TextField";
import { UserCard } from "../../components/UserCard/UserCard";
import { Context } from "../../context/Context";

export const UsersPage = () => {
  const { users, authorizedUserId, getUsers } = useContext(Context);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.container}>
      <TextField placeholder="Search User" />
      {users &&
        users.map((user) => (
          <UserCard key={user._id} authorizedUserId={authorizedUserId} user={user} />
        ))}
    </div>
  );
};
