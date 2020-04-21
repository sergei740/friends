import { createContext } from "react";

function noop() {}

export const Context = createContext({
  componentName: "",
  changeComponentName: noop,
});
