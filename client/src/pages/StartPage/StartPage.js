import React, { useContext } from "react";
import { RegistrationFormComponent } from "../../components/RegistrationFormComponent/RegistrationFormComponent";
import { SignInFormComponent } from "../../components/SignInFormComponent/SignInFormComponent";
import { StartPageComponent } from "../../components/StartPageComponent/StartPageComponent";
import { Context } from "../../context/Context";

export const StartPage = () => {
  const { componentName } = useContext(Context);

  const renderComponent = (componentName) => {
    switch (componentName) {
      case "singin":
        return <SignInFormComponent />;
      case "registartion":
        return <RegistrationFormComponent />;
      default:
        return <StartPageComponent />;
    }
  };

  return <>{renderComponent(componentName)}</>;
};
