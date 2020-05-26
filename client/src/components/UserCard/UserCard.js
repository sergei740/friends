import React, { Fragment, useContext, useState, useEffect } from "react";
import { Dialog, makeStyles } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import styles from "./user-card.module.css";
import fadeTransition from "./transitions/fade.module.css";
import _ from "lodash";
import { Context } from "../../context/Context";
import { SendMessageComponent } from "../SendMessageComponent/SendMessageComponent";

export const UserCard = (props) => {
  const {
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    deleteFriend,
    loading,
  } = useContext(Context);
  const { authorizedUserId } = props;
  const {
    _id,
    name,
    friendList,
    outgoingFriendRequestsList,
    incomingFriendRequestsList,
    photo,
  } = props.user;
  const isFriend = friendList.includes(authorizedUserId);
  const isIncomingRequest = outgoingFriendRequestsList.includes(authorizedUserId);
  const isOutgoingRequest = incomingFriendRequestsList.includes(authorizedUserId);

  const [open, setOpen] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [messageComponent, setMessageComponent] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setAnimation(true);
  }, []);

  function SimpleDialog(props) {
    const useStyles = makeStyles({
      root: { background: "rgba(0, 0, 0, 0.8)" },
    });

    const classes = useStyles();
    const { onClose, selectedValue, open, photo } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        className={classes.root}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <Fragment>
          {photo ? (
            <img
              src={`/api/file/${photo}`}
              alt={photo}
              style={{
                width: "100%",
                overflow: "hidden",
                objectFit: "scale-down",
              }}
            />
          ) : (
            <h1 style={{ textTransform: "uppercase", color: "#ffffff" }}>User photo not found</h1>
          )}
        </Fragment>
      </Dialog>
    );
  }

  return (
    <CSSTransition
      in={animation}
      timeout={1000}
      classNames={fadeTransition}
      mountOnEnter
      unmountOnExit
    >
      <Fragment>
        <div className={styles.userCard}>
          <div className={styles.flexContainer}>
            <img
              src={photo ? `/api/file/${photo}` : `https://via.placeholder.com/65`}
              alt={name}
              className={styles.photo}
              onClick={handleClickOpen}
            />
            <p className={styles.name}>{_.capitalize(name)}</p>
          </div>
          <div className={styles.buttonsContainer}>
            {isIncomingRequest && !isFriend && (
              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ marginRight: "10px" }}
                  disabled={loading}
                  onClick={() => acceptFriendRequest(authorizedUserId, _id)}
                >
                  ACCEPT
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  disabled={loading}
                  onClick={() => rejectFriendRequest(authorizedUserId, _id)}
                >
                  REJECT
                </button>
              </div>
            )}
            {!isFriend && !isIncomingRequest && !isOutgoingRequest ? (
              <button
                className="btn btn-primary"
                type="button"
                disabled={loading}
                onClick={() => sendFriendRequest(authorizedUserId, _id)}
              >
                ADD FRIEND
              </button>
            ) : null}
            {isFriend && (
              <div className={styles.flexContainer}>
                {!messageComponent ? (
                  <Fragment>
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={() => {
                        setMessageComponent(true);
                      }}
                    >
                      MESSAGE
                    </button>
                    <p className={styles.friend}>friend</p>
                    <button
                      className="btn btn-danger"
                      type="button"
                      disabled={loading}
                      onClick={() => deleteFriend(authorizedUserId, _id)}
                    >
                      REMOVE FRIEND
                    </button>
                  </Fragment>
                ) : (
                  <SendMessageComponent setMessageComponent={setMessageComponent} id={_id} />
                )}
              </div>
            )}
            {isOutgoingRequest && !isFriend && (
              <div className={styles.flexContainer}>
                <p className={styles.friend}>request has been sent</p>
                <button
                  className="btn btn-danger"
                  type="button"
                  disabled={loading}
                  onClick={() => cancelFriendRequest(authorizedUserId, _id)}
                >
                  CANCEL REQUEST
                </button>
              </div>
            )}
          </div>
        </div>
        <SimpleDialog open={open} onClose={handleClose} photo={photo} />
      </Fragment>
    </CSSTransition>
  );
};
