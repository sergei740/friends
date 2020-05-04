import React, { useContext, useEffect, useState } from "react";
import styles from "./user-page.module.css";
import { TextField } from "../../components/TextField/TextField";
import { UserCard } from "../../components/UserCard/UserCard";
import { Context } from "../../context/Context";

export const UsersPage = () => {
  const { users, authorizedUserId, getUsers } = useContext(Context);
  const [textInput, setTextInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    const newFilteredUsers = users.filter((user) => {
      // return user.name.toLowerCase().trim().indexOf(textInput.toLocaleLowerCase().trim()) === 0;
      return user.name.toLowerCase().trim().includes(textInput.toLocaleLowerCase().trim());
    });
    setFilteredUsers(newFilteredUsers);
  }, [textInput, users]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className={styles.container}>
      <TextField placeholder="Search User" onChange={inputHandler} value={textInput} />
      {filteredUsers &&
        filteredUsers.map((user) => (
          <UserCard key={user._id} authorizedUserId={authorizedUserId} user={user} />
        ))}
    </div>
  );
};
