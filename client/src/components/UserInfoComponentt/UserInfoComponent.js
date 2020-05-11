import React, { useState, useContext, useEffect, Fragment } from "react";
import { Dialog } from "@material-ui/core";
import styles from "./user-info-component.module.css";
import { Context } from "../../context/Context";
import { useHttp } from "../../hooks/http.hook";
import _ from "lodash";

export const UserInfoComponent = () => {
  const [open, setOpen] = useState(false);
  const { authorizedUser, token } = useContext(Context);
  const [photoAuthUser, setPhotoAuthUser] = useState("");
  const { request } = useHttp();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPhotoAuthUser(authorizedUser.photo);
  }, [authorizedUser]);

  const fileInputHandler = () => {
    const btn = document.getElementById("submit");
    btn.removeAttribute("disabled");
  };

  const uploadPhoto = (e) => {
    e.preventDefault();
    const file = document.getElementById("file");
    const formData = new FormData();
    formData.append("file", file.files[0]);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    fetch("/api/users/userPhoto", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setPhotoAuthUser(data.photo);
      });
  };

  const deletePhoto = async () => {
    setLoading(true);
    const data = await request("/api/users/deleteUserPhoto", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setLoading(false);
    setPhotoAuthUser(data.photo);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function SimpleDialog(props) {
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
            <img
              src={userPhoto || "https://ipsumimage.appspot.com/400"}
              alt={userPhoto || "https://ipsumimage.appspot.com/400"}
              style={{ width: "100%", overflow: "hidden", height: "auto" }}
            />
            <form encType="multipart/form-data" className={styles.form} onSubmit={uploadPhoto}>
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={fileInputHandler}
              />
              <label htmlFor="file">Choose a Photo</label>

              <button id="submit" type="submit" className="btn btn-primary btn-sm" disabled>
                Upload photo
              </button>
              <button type="button" className="btn btn-danger btn-sm" onClick={deletePhoto}>
                Delete photo
              </button>
            </form>
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
