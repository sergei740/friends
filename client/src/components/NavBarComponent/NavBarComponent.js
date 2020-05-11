import React, { useContext, useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import fadeTransition from "./transitions/fade.module.css";
import styles from "./nav-bar-component.module.css";
import { Context } from "../../context/Context";
import { UserInfoComponent } from "../UserInfoComponentt/UserInfoComponent";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

export const NavBarComponent = () => {
  const { logOut, loading } = useContext(Context);
  const [animation, setAnimation] = useState(false);

  const ColorLinearProgress = withStyles({
    root: {
      height: 2,
      zIndex: 2000,
      position: "fixed",
      width: "100%",
    },
    colorPrimary: {
      backgroundColor: "#ffffff",
    },
    barColorPrimary: {
      backgroundColor: "#007bff",
    },
  })(LinearProgress);

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <CSSTransition
      in={animation}
      timeout={750}
      classNames={fadeTransition}
      mountOnEnter
      unmountOnExit
    >
      <Fragment>
        <div className={styles.navBarContainer}>
          <div>
            <NavLink exact to="/users" activeClassName={styles.active}>
              USERS
            </NavLink>
            <NavLink exact to="/friends" activeClassName={styles.active}>
              FRIENDS
            </NavLink>
          </div>
          <div className={styles.userInfoContainer}>
            <UserInfoComponent />
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
        {loading && <ColorLinearProgress />}
      </Fragment>
    </CSSTransition>
  );
};
