import React, { useContext, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./start-page-component.module.css";
import fadeTransition from "./transitions/fade.module.css";
import slideFromLeftTransition from "./transitions/slide-from-left.module.css";
import slideFromRightTransition from "./transitions/slide-from-right.module.css";
import { Context } from "../../context/Context";

export const StartPageComponent = () => {
  const { changeComponentName } = useContext(Context);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div>
        <CSSTransition
          in={animation}
          timeout={2500}
          classNames={fadeTransition}
          mountOnEnter
          unmountOnExit
        >
          <div className={styles.textContainer}>
            <p className={styles.text}>join to the</p>
            <h1>FRIENDS</h1>
          </div>
        </CSSTransition>
        <div className={styles.buttonsContainer}>
          <CSSTransition
            in={animation}
            timeout={1500}
            classNames={slideFromLeftTransition}
            mountOnEnter
            unmountOnExit
          >
            <button
              name="singin"
              type="button"
              className="btn btn-primary"
              onClick={changeComponentName}
            >
              SIGN IN
            </button>
          </CSSTransition>
          <p className={styles.text}>or</p>
          <CSSTransition
            in={animation}
            timeout={1500}
            classNames={slideFromRightTransition}
            mountOnEnter
            unmountOnExit
          >
            <button
              name="registartion"
              type="button"
              className="btn btn-danger"
              onClick={changeComponentName}
            >
              REGISTRATION
            </button>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};
