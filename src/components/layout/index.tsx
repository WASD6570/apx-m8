import React, { Suspense } from "react";
import { Logo } from "../ui/logo";
import { BurgerMenu, Buttons } from "../ui/buttons";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";
import { MediaLogo } from "../ui/media-logos";
import { BallTriangle } from "react-loading-icons";
import { LogInForm } from "../login/index";
import { SignInForm } from "../signin";
import { Dashboard } from "../dashboard";
import main from "../../styles/bulma.css";
import css from "./index.css";
import { useGetUserData } from "../../hooks/user";
import { useMountAuthForm } from "../../hooks/modal";

type layoutProps = {
  loading: boolean;
};

function Layout({ loading }: layoutProps) {
  const data = useGetUserData();
  const [whichForm, setLogin] = useMountAuthForm();
  const form = whichForm ? <LogInForm /> : <SignInForm />;

  return (
    <div className={[main.container, css.root].join(" ")}>
      <Header>
        <Logo></Logo>
        <BurgerMenu></BurgerMenu>
      </Header>
      <section className={[main["has-text-centered"], css.section].join(" ")}>
        {loading ? <BallTriangle stroke={"#00d1b2"}></BallTriangle> : null}
        <Suspense fallback={<div></div>}>
          {data.token == null ? form : <Dashboard />}
        </Suspense>
        <Outlet />
      </section>
      <Footer>
        <MediaLogo
          iconImgUrl="https://cdn-icons-png.flaticon.com/512/174/174855.png"
          iconLink="https://www.instagram.com/nico_sanchez6570/"
        ></MediaLogo>
        <MediaLogo
          iconImgUrl="https://cdn-icons-png.flaticon.com/512/270/270798.png"
          iconLink="https://github.com/WASD6570?tab=repositories"
        ></MediaLogo>
        <MediaLogo
          iconImgUrl="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          iconLink="https://www.linkedin.com/in/eduardo-n-sanchez/"
        ></MediaLogo>
        <MediaLogo
          iconImgUrl="https://cdn-icons-png.flaticon.com/512/1260/1260667.png"
          iconLink="/"
          text={"built with"}
        ></MediaLogo>
      </Footer>
    </div>
  );
}

export { Layout };

/* <ModalCard
          title="Inicia sesion"
          footer={
            <p>
              No tienes una cuenta todavia?{" "}
              <a onClick={handleMountSignIn}>Crea una ahora!</a>
            </p>
          }
        >
          <TextField
            type="text"
            name="email"
            placeholder="email"
            styles={["input", "mb-2", "is-info"]}
          ></TextField>
          <TextField
            type="password"
            name="password"
            placeholder="password"
            styles={["input", "mb-2", "is-info"]}
          ></TextField>

          <Buttons
            click={() => {
              console.log("cear cuenta");
            }}
            buttonName="crear cuenta"
            styles={["button", "is-link", "mb-2"]}
          ></Buttons>
        </ModalCard> */
