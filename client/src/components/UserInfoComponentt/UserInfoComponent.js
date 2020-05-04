import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import styles from "./user-info-component.module.css";
import _ from "lodash";
import { useHttp } from "../../hooks/http.hook";

export const UserInfoComponent = (props) => {
  const { userName } = props;
  const { request } = useHttp();
  const [fileName, setFileName] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fileHandler = (e) => {
    setFileName(e.target.files[0]);
  };

  useEffect(() => {
    console.log(fileName);
  }, [fileName]);

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <img src="https://via.placeholder.com/150" alt="" />
        <input type="file" onChange={fileHandler} />
        <button type="button" className="btn btn-primary">
          Upload photo
        </button>
      </Dialog>
    );
  }

  return (
    <div className={styles.container}>
      <div onClick={handleClickOpen}>
        <img src="https://via.placeholder.com/65" className={styles.photoBlock} alt="" />
      </div>
      <div>{_.capitalize(userName)}</div>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
};
