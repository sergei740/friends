import { createContext } from "react";

function noop() {}

export const Context = createContext({
  componentName: "",
  changeComponentName: noop,
  registrationForm: {},
  handleRegistrationForm: noop,
  submitRegistrationForm: noop,
  signInForm: {},
  handleSignInForm: noop,
  submitSignInForm: noop,
  loading: false,
  submitFormData: {},
  logOut: noop,
  sendFriendRequest: noop,
  cancelFriendRequest: noop,
  acceptFriendRequest: noop,
  deleteFriend: noop,
  authorizedUserId: "",
  users: [],
  getUsers: noop,
});
