import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./nav-bar-component.module.css";
import { Context } from "../../context/Context";
import { UserInfoComponent } from "../UserInfoComponentt/UserInfoComponent";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

export const NavBarComponent = () => {
  const { logOut, loading } = useContext(Context);
  const userName = JSON.parse(localStorage.getItem("userName")) || "No name";

  const ColorLinearProgress = withStyles({
    root: {
      height: 3,
    },
    colorPrimary: {
      backgroundColor: "#ffffff",
    },
    barColorPrimary: {
      backgroundColor: "#007bff",
    },
  })(LinearProgress);

  return (
    <>
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
      <div className={styles.progress}>{loading && <ColorLinearProgress />}</div>
    </>
  );
};
