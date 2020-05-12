import React, { useState, useContext, useEffect, Fragment } from "react";
import { Dialog, makeStyles } from "@material-ui/core";
import styles from "./user-info-component.module.css";
import { Context } from "../../context/Context";
import { useHttp } from "../../hooks/http.hook";
import _ from "lodash";

export const UserInfoComponent = () => {
  const [open, setOpen] = useState(false);
  const { authorizedUser, token } = useContext(Context);
  const [photoAuthUser, setPhotoAuthUser] = useState("");
  const { request, loading } = useHttp();

  useEffect(() => {
    setPhotoAuthUser(authorizedUser.photo);
  }, [authorizedUser]);

  const uploadPhoto = async (e) => {
    e.preventDefault();
    const file = document.getElementById("file");
    const formData = new FormData();
    formData.append("file", file.files[0]);

    const data = await request("/api/users/userPhoto", "POST", formData, {
      Authorization: `Bearer ${token}`,
    });

    setPhotoAuthUser(data.photo);
  };

  const deletePhoto = async () => {
    const data = await request("/api/users/deleteUserPhoto", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setPhotoAuthUser(data.photo);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function SimpleDialog(props) {
    const useStyles = makeStyles({
      root: { background: "rgba(0, 0, 0, 0.8)" },
    });
    const classes = useStyles();
    const { onClose, selectedValue, open, photo } = props;
    const [userPhoto, setUserPhoto] = useState("");

    useEffect(() => {
      setUserPhoto(photo);
    }, [photo]);

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
        {!loading ? (
          <Fragment>
            {userPhoto ? (
              <img
                src={userPhoto}
                alt={userPhoto}
                style={{
                  width: "100%",
                  overflow: "hidden",
                  height: "100vh",
                  objectFit: "scale-down",
                }}
              />
            ) : (
              <h1 style={{ textTransform: "uppercase", color: "#ffffff" }}>
                Choose file and Upload your profile photo
              </h1>
            )}

            <div className={styles.form}>
              <div className={styles.inputContainer}>
                <button className={styles.btn}>Upload photo</button>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/jpg"
                  onChange={uploadPhoto}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={deletePhoto}
                disabled={!userPhoto}
              >
                Delete photo
              </button>
            </div>
          </Fragment>
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </Dialog>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.photoContainer} onClick={handleClickOpen}>
        <img
          src={photoAuthUser || "https://via.placeholder.com/65"}
          className={styles.photoBlock}
          alt={authorizedUser.name}
        />
      </div>
      <div>{_.capitalize(authorizedUser.name)}</div>
      <SimpleDialog open={open} onClose={handleClose} photo={photoAuthUser} />
    </div>
  );
};
