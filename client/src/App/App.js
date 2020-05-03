import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Context } from "../context/Context";
import { useHttp } from "../hooks/http.hook";
import { useRoutes } from "../routes/routes";

function App() {
  const [token, setToken] = useState(null);
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
  const authorizedUserId = JSON.parse(localStorage.getItem("id"));

  const changeComponentName = (e) => {
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
      setTimeout(() => {
        setComponentName("");
      }, 3000);
    }
    setSubmitFormData(data);
  };

  const handleSignInForm = (e) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };

  const submitSignInForm = async (e) => {
    e.preventDefault();

    const data = await request("/api/auth/login", "POST", { ...signInForm });
    setSubmitFormData({});
    if (data.token) {
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("id", JSON.stringify(data.userId));
      setToken(data.token);
      setSignInForm({ email: "", password: "" });
    }
    setSubmitFormData(data);
  };

  const logOut = () => {
    localStorage.clear();
    setToken(null);
    setComponentName("");
  };

  const getUsers = async () => {
    const data = await request("/api/users/users", "GET");
    const usersByAuthorizedUserId = data.users.filter((user) => user._id !== authorizedUserId);
    setUsers(usersByAuthorizedUserId);
  };

  const sendFriendRequest = async (authorizedUserId, friendCandidateId) => {
    await request("/api/users/sendFriendRequest", "POST", {
      authorizedUserId,
      friendCandidateId,
    });
    getUsers();
  };

  const cancelFriendRequest = async (authorizedUserId, friendCandidateId) => {
    await request("/api/users/cancelSendFriendRequest", "POST", {
      authorizedUserId,
      friendCandidateId,
    });
    getUsers();
  };

  const acceptFriendRequest = async (authorizedUserId, friendCandidateId) => {
    await request("/api/users/acceptFriendRequest", "POST", {
      authorizedUserId,
      friendCandidateId,
    });
    getUsers();
  };

  const rejectFriendRequest = async (authorizedUserId, friendCandidateId) => {
    await request("/api/users/rejectFriendRequest", "POST", {
      authorizedUserId,
      friendCandidateId,
    });
    getUsers();
  };

  const deleteFriend = async (authorizedUserId, friendId) => {
    await request("/api/users/deleteFriend", "POST", {
      authorizedUserId,
      friendId,
    });
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(JSON.parse(localStorage.getItem("token")));
    } else {
      setToken(null);
    }
  }, [token]);

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
        authorizedUserId,
        users,
        getUsers,
      }}
    >
      <Router>{routes}</Router>
    </Context.Provider>
  );
}

export default App;
