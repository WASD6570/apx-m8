import React, { useState, useEffect, Suspense } from "react";
import { BallTriangle } from "react-loading-icons";

import main from "../../../styles/bulma.css";
import css from "./index.css";
import { useSetModalState, useGetModalState } from "../../../hooks/modal";
import { Buttons } from "../buttons";

type test = {
  click: (boolean: boolean) => boolean;
};

function ModalCard(props: any) {
  const setModalState = useSetModalState();
  const modalState = useGetModalState();

  function handleClick() {
    setModalState(false);
  }

  const modalActive = [main.modal, main["is-active"]].join(" ");
  const modalInactive = main.modal;
  return (
    <div className={modalState ? modalActive : modalInactive}>
      <div className={main["modal-background"]}></div>
      <div className={[main["modal-card"], css.root].join(" ")}>
        <header
          className={[
            main["modal-card-head"],
            main["is-flex"],
            main["is-flex-direction-row"],
            main["is-justify-content-center"],
          ].join(" ")}
        >
          <p className={main["modal-card-title"]}>{props.title}</p>
          <Buttons
            buttonName=""
            styles={["delete"]}
            click={handleClick}
          ></Buttons>
        </header>
        <Suspense fallback={<BallTriangle stroke={"#00d1b2"}></BallTriangle>}>
          <section
            className={[
              main["modal-card-body"],
              main["has-text-centered"],
            ].join(" ")}
          >
            {props.children}
          </section>
        </Suspense>
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
