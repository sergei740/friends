import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Context } from "../context/Context";
import { useHttp } from "../hooks/http.hook";
import { useRoutes } from "../routes/routes";
import { useAuth } from "../hooks/auth.hook";

function App() {
  const { token, login, logout } = useAuth();
  const routes = useRoutes(token);
  const { loading, request } = useHttp();
  const [componentName, setComponentName] = useState("");
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    login: "",
    password: "",
  });
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [submitFormData, setSubmitFormData] = useState({});
  const [users, setUsers] = useState([]);
  const [authorizedUser, setAuthorizedUser] = useState("");

  const changeComponentName = (e) => {
    setSignInForm({ email: "", password: "" });
    setRegistrationForm({ name: "", email: "", login: "", password: "" });
    setSubmitFormData({});
    if (e.target.name) {
      setComponentName(e.target.name);
    } else {
      setComponentName("");
    }
  };

  const handleRegistrationForm = (e) => {
    setRegistrationForm({ ...registrationForm, [e.target.name]: e.target.value });
    setSubmitFormData({});
  };

  const submitRegistrationForm = async (e) => {
    e.preventDefault();

    const data = await request("/api/auth/register", "POST", { ...registrationForm });
    setSubmitFormData({});
    if (!data.error) {
      setSubmitFormData(data);
      setRegistrationForm({ name: "", email: "", login: "", password: "" });
    }
    setSubmitFormData(data);
  };

  const handleSignInForm = (e) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
    setSubmitFormData({});
  };

  const submitSignInForm = async (e) => {
    e.preventDefault();

    const data = await request("/api/auth/login", "POST", { ...signInForm });
    setSubmitFormData({});
    if (data.token) {
      login(data.token, data.userId);
      setSignInForm({ email: "", password: "" });
    }
    setSubmitFormData(data);
  };

  const logOut = () => {
    logout();
    setComponentName("");
  };

  const getUsers = useCallback(
    async (token) => {
      const data = await request("/api/users/users", "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      setAuthorizedUser({
        name: data.authUserName,
        photo: data.authUserPhoto,
        id: data.authUserId,
      });
      setUsers(data.users);
    },
    [request]
  );

  const sendFriendRequest = async (authorizedUserId, friendCandidateId) => {
    const data = await request("/api/users/sendFriendRequest", "POST", {
      authorizedUserId,
      friendCandidateId,
    });
    setUsers(data.users);
  };

  const cancelFriendRequest = async (authorizedUserId, friendCandidateId) => {
    const data = await request("/api/users/cancelSendFriendRequest", "POST", {
      authorizedUserId,
      friendCandidateId,
    });
    setUsers(data.users);
  };

  const acceptFriendRequest = async (authorizedUserId, friendCandidateId) => {
    const data = await request("/api/users/acceptFriendRequest", "POST", {
      authorizedUserId,
      friendCandidateId,
    });
    setUsers(data.users);
  };

  const rejectFriendRequest = async (authorizedUserId, friendCandidateId) => {
    const data = await request("/api/users/rejectFriendRequest", "POST", {
      authorizedUserId,
      friendCandidateId,
    });
    setUsers(data.users);
  };

  const deleteFriend = async (authorizedUserId, friendId) => {
    const data = await request("/api/users/deleteFriend", "POST", {
      authorizedUserId,
      friendId,
    });
    setUsers(data.users);
  };

  useEffect(() => {}, [token]);

  return (
    <Context.Provider
      value={{
        componentName,
        changeComponentName,
        registrationForm,
        handleRegistrationForm,
        submitRegistrationForm,
        signInForm,
        handleSignInForm,
        submitSignInForm,
        loading,
        submitFormData,
        logOut,
        sendFriendRequest,
        cancelFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        deleteFriend,
        users,
        getUsers,
        authorizedUser,
        token,
      }}
    >
      <Router>{routes}</Router>
    </Context.Provider>
  );
}

export default App;
