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
  const [humburgerMenu, setHumburgerMenu] = useState(styles.navBarLinks);

  const toggleHumburgerMenu = (humburgerMenu) => {
    if (humburgerMenu !== styles.navBarLinksShow) {
      setHumburgerMenu(styles.navBarLinksShow);
    } else {
      setHumburgerMenu(styles.navBarLinks);
    }
  };

  // document.addEventListener("click", (e) => {
  //   const targetId = e.target.id;
  //   if (
  //     (targetId === "humburger" || targetId === "humburgerMenu") &&
  //     humburgerMenu !== styles.navBarLinksShow
  //   ) {
  //     setHumburgerMenu(styles.navBarLinksShow);
  //   } else {
  //     setHumburgerMenu(styles.navBarLinks);
  //   }
  // });

  const ColorLinearProgress = withStyles({
    root: {
      height: 2,
      zIndex: 2000,
      position: "fixed",
      top: 0,
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
          <div
            id="humburger"
            className={styles.humburger}
            onClick={() => toggleHumburgerMenu(humburgerMenu)}
          >
            <div></div>
          </div>
          <div className={humburgerMenu} id="humburgerMenu">
            <NavLink
              exact
              to="/users"
              activeClassName={styles.active}
              onClick={() => toggleHumburgerMenu(humburgerMenu)}
            >
              USERS
            </NavLink>
            <NavLink
              exact
              to="/friends"
              activeClassName={styles.active}
              onClick={() => toggleHumburgerMenu(humburgerMenu)}
            >
              FRIENDS
            </NavLink>
            <NavLink
              exact
              to="/messages"
              activeClassName={styles.active}
              onClick={() => toggleHumburgerMenu(humburgerMenu)}
            >
              MESSAGES
            </NavLink>
          </div>
          <div className={styles.userInfoContainer}>
            <UserInfoComponent />
            <button name="registartion" type="button" className="btn btn-danger" onClick={logOut}>
              LOG OUT
            </button>
          </div>
        </div>
        {loading && <ColorLinearProgress />}
      </Fragment>
    </CSSTransition>
  );
};
