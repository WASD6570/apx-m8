import React from "react";
import css from "./header.css";
import main from "../../styles/bulma.css";
import { useMountAuthForm } from "../../hooks/modal";
import { LogInForm } from "../login/index";
import { SignInForm } from "../signin";
import { Logo } from "../ui/logo";
import { useGetUserData } from "../../hooks/user";
import { BurgerMenu, Buttons } from "../ui/buttons";
import { Dashboard } from "../dashboard";

export function Header(props) {
  const data = useGetUserData();

  const [whichForm, setLogin] = useMountAuthForm();
  const form = whichForm ? <LogInForm /> : <SignInForm />;

  return (
    <nav
      className={[css["root"], main["navbar"]].join(" ")}
      role="navigation"
      aria-label="main navigation"
    >
      <div className={main["navbar-brand"]}>
        <Logo></Logo>
        <BurgerMenu>{data.token == null ? form : <Dashboard />}</BurgerMenu>
      </div>
    </nav>
  );
}
