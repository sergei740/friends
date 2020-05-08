import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { StartPage } from "../pages/StartPage/StartPage";
import { UsersPage } from "../pages/UsersPage/UsersPage";
import { FriendsPage } from "../pages/FriendsPage/FriendsPage";
import { NavBarComponent } from "../components/NavBarComponent/NavBarComponent";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/users" exact>
          <NavBarComponent />
          <UsersPage />
        </Route>
        <Route path="/friends" exact>
          <NavBarComponent />
          <FriendsPage />
        </Route>
        <Redirect to="/users" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <StartPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
