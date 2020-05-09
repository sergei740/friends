import React, { useState, useContext } from "react";
import { Dialog } from "@material-ui/core";
import styles from "./user-info-component.module.css";
import { Context } from "../../context/Context";
import { useHttp } from "../../hooks/http.hook";
import _ from "lodash";

export const UserInfoComponent = () => {
  const [open, setOpen] = useState(false);
  const { authorizedUser, token } = useContext(Context);
  const { request } = useHttp();

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

    fetch("/api/users/userPhoto", options).then((response) => {
      console.log(response);
    });
  };

  const deletePhoto = async () => {
    const data = await request("/api/users/deleteUserPhoto", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    console.log(data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

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
          },
        }}
      >
        <img
          src={authorizedUser.photo || "https://via.placeholder.com/200"}
          alt={authorizedUser.name}
          style={{ overflow: "hidden" }}
        />
        <form encType="multipart/form-data" onSubmit={uploadPhoto}>
          <input
            type="file"
            name="file"
            id="file"
            accept="image/gif, image/jpeg, image/png"
            onChange={fileInputHandler}
          />
          <button id="submit" type="submit" className="btn btn-primary btn-sm" disabled>
            Upload photo
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={deletePhoto}>
            Delete photo
          </button>
        </form>
      </Dialog>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.photoContainer} onClick={handleClickOpen}>
        <img
          src={authorizedUser.photo || "https://via.placeholder.com/65"}
          className={styles.photoBlock}
          alt={authorizedUser.name}
        />
      </div>
      <div>{_.capitalize(authorizedUser.name)}</div>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
};
