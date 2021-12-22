import React from "react";
import main from "../../../styles/bulma.css";
import css from "./index.css";

function ModalCard({
  toggleOffModal,
  title,
  subtitle,
  children,
  haveFooter = true,
  footer,
  state,
}: any) {
  function handleClick() {
    toggleOffModal(false);
  }

  const modalActive = [main.modal, main["is-active"]].join(" ");
  const modalInactive = main.modal;
  return (
    <div className={state ? modalActive : modalInactive}>
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
          <p className={main["modal-card-title"]}>{title}</p>
          <p
            className={[main["subtitle"], main["is-5"], css.subtitle].join(" ")}
          >
            {subtitle}
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
          {children}
        </section>
        {haveFooter ? (
          <footer
            className={[
              main["modal-card-foot"],
              main["is-flex"],
              main["is-flex-direction-column"],
              main["is-justify-content-center"],
            ].join(" ")}
          >
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}

export { ModalCard };
