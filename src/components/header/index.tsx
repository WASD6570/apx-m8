import React, { useState } from "react";
import css from "./header.css";
import main from "../../styles/bulma.css";
import { LogInForm } from "../login/index";
import { SignInForm } from "../signin";
import { Logo } from "../ui/logo";
import { useGetUserData, useCloseSession } from "../../hooks/user";
import { BurgerMenu, AuthButton } from "../ui/buttons";
import { Dashboard } from "../dashboard";
import { useNavigate } from "react-router-dom";

export function Header() {
  const data = useGetUserData();
  const navigate = useNavigate();
  const closeSession = useCloseSession();
  const [whichForm, setWichForm] = useState(false);
  const form = whichForm ? (
    <LogInForm mountForm={setWichForm} />
  ) : (
    <SignInForm mountForm={setWichForm} />
  );

  function handleCloseSession() {
    closeSession();
  }

  return (
    <nav
      className={[css["root"], main["navbar"]].join(" ")}
      role="navigation"
      aria-label="main navigation"
    >
      <div className={main["navbar-brand"]}>
        <Logo></Logo>
        <BurgerMenu>{data.token == null ? form : <Dashboard />}</BurgerMenu>

        <div className={[css["desktop"], main["navbar-menu"]].join(" ")}>
          <div className={main["navbar-start"]}>
            <a
              onClick={() => {
                navigate("/mascotas-perdidas-cerca-tuyo", { replace: true });
              }}
              className={main["navbar-item"]}
            >
              Mascotas cerca tuyo
            </a>
            {data.token == null ? null : (
              <div
                className={[
                  main["navbar-item"],
                  main["has-dropdown"],
                  main["is-hoverable"],
                ].join(" ")}
              >
                <a className={main["navbar-link"]}>Mis mascotas</a>

                <div className={main["navbar-dropdown"]}>
                  <a
                    onClick={() => {
                      navigate("/reportar-mascota", { replace: true });
                    }}
                    className={main["navbar-item"]}
                  >
                    Reportar Mascota
                  </a>
                  <a
                    onClick={() => {
                      navigate("/mis-mascotas-reportadas", { replace: true });
                    }}
                    className={main["navbar-item"]}
                  >
                    Mis mascotas reportadas
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {data.token == null ? (
        <div className={[main["navbar-end"], css.desktop].join(" ")}>
          <div className={main["navbar-item"]}>
            <div className={main["buttons"]}>
              <AuthButton
                buttonName="Registrate"
                styles={["button", "is-link"]}
                click={() => {
                  setWichForm(false);
                }}
              >
                {form}
              </AuthButton>
              <AuthButton
                buttonName="Iniciá sesion"
                styles={["button", "is-light"]}
                click={() => {
                  setWichForm(true);
                }}
              >
                {form}
              </AuthButton>
            </div>
          </div>
        </div>
      ) : (
        <div className={[main["navbar-end"], css.desktop].join(" ")}>
          <div
            className={[
              main["navbar-item"],
              main["has-dropdown"],
              main["is-hoverable"],
            ].join(" ")}
          >
            <a className={main["navbar-link"]}>{data.email}</a>

            <div className={main["navbar-dropdown"]}>
              <a
                onClick={() => {
                  navigate("/mis-datos", { replace: true });
                }}
                className={main["navbar-item"]}
              >
                mis datos
              </a>
              <a
                onClick={handleCloseSession}
                className={[main["navbar-item"], main["has-text-link"]].join(
                  " "
                )}
              >
                cerrar sesion
              </a>
              <hr className={main["navbar-divider"]} />
              <a
                href="https://github.com/WASD6570/apx-m8"
                className={main["navbar-item"]}
              >
                Reportar un problema
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
