import React, { useState, useEffect, Suspense } from "react";
import { BallTriangle } from "react-loading-icons";

import main from "../../../styles/bulma.css";
import css from "./index.css";

type test = {
  click: (boolean: boolean) => boolean;
};

function ModalCard(props: any) {
  function handleClick() {
    props.toggleOffModal(false);
  }

  const modalActive = [main.modal, main["is-active"]].join(" ");
  const modalInactive = main.modal;
  return (
    <div className={props.state ? modalActive : modalInactive}>
      <div className={main["modal-background"]}></div>
      <div className={[main["modal-card"], css.root].join(" ")}>
        <header
          className={[
            main["modal-card-head"],
            main["is-flex"],
            main["is-flex-direction-column"],
            main["is-justify-content-flex-start"],
          ].join(" ")}
        >
          <p className={main["modal-card-title"]}>{props.title}</p>
          <p
            className={[main["subtitle"], main["is-5"], css.subtitle].join(" ")}
          >
            {props.subtitle}
          </p>
          <div
            className={[main["delete"], css.delete].join(" ")}
            onClick={handleClick}
          ></div>
        </header>
        <section
          className={[main["modal-card-body"], main["has-text-centered"]].join(
            " "
          )}
        >
          {props.children}
        </section>
        <footer
          className={[
            main["modal-card-foot"],
            main["is-flex"],
            main["is-flex-direction-column"],
            main["is-justify-content-center"],
          ].join(" ")}
        >
          {props.footer}
        </footer>
      </div>
    </div>
  );
}

export { ModalCard };
