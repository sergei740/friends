import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./nav-bar-component.module.css";
import { Context } from "../../context/Context";
import { UserInfoComponent } from "../UserInfoComponentt/UserInfoComponent";

export const NavBarComponent = () => {
  const { logOut } = useContext(Context);
  const userName = JSON.parse(localStorage.getItem("userName")) || "No name";

  return (
    <div className={styles.navBarContainer}>
      <div>
        <NavLink to="/users">USERS</NavLink>
        <NavLink to="/friends">FRIENDS</NavLink>
        <NavLink to="/game">GAME</NavLink>
      </div>
      <div className={styles.userInfoContainer}>
        <UserInfoComponent userName={userName} />
        <button
          name="registartion"
          type="button"
          className="btn btn-outline-danger"
          onClick={logOut}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};
