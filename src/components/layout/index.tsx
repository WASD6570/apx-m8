import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";
import { MediaLogo } from "../ui/media-logos";
import { BallTriangle } from "react-loading-icons";
import main from "../../styles/bulma.css";
import css from "./index.css";

type layoutProps = {
  loading: boolean;
};

function Layout() {
  return (
    <div className={[main.container, css.root].join(" ")}>
      <Header></Header>
      <section className={[main["has-text-centered"], css.section].join(" ")}>
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
