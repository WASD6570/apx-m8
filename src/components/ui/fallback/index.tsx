import React from "react";
import { Footer } from "../../footer";
import { MediaLogo } from "../media-logos";
import { BallTriangle } from "react-loading-icons";
import main from "../../../styles/bulma.css";
import css from "../../layout/index.css";
import header from "../../header/header.css";
import fallback from "./index.css";
import { Logo } from "../logo";

export function Fallback() {
  return (
    <div className={[main.container, css.root].join(" ")}>
      <nav
        className={[header["root"], main["navbar"]].join(" ")}
        role="navigation"
        aria-label="main navigation"
      >
        <div className={main["navbar-brand"]}>
          <Logo></Logo>
          <a role="button" className={main["navbar-burger"]}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>
      <section className={[main["has-text-centered"], css.section].join(" ")}>
        <BallTriangle
          stroke="#f08080"
          width="200px"
          height="250px"
          className={[main["is-align-self-center"], fallback["div"]].join(" ")}
        />
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
