import React, { useState } from "react";
import styles from "./app.module.css";
import { StartPage } from "../pages/StartPage/StartPage";
import { Context } from "../context/Context";

function App() {
  const [componentName, setComponentName] = useState("");

  const changeComponentName = (e) => {
    if (e.target.name) {
      setComponentName(e.target.name);
    } else {
      setComponentName("");
    }
  };

  return (
    <Context.Provider value={{ componentName, changeComponentName }}>
      <StartPage />
    </Context.Provider>
  );
}

export default App;
