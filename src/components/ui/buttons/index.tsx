import React, { useState, useEffect } from "react";
import main from "../../../styles/bulma.css";
import { useSetModalState, useGetModalState } from "../../../hooks/modal";

type buttonsProps = {
  buttonName: string;
  styles: Array<string>;
  click: () => void | null;
};

function Buttons({ buttonName, styles, click }: buttonsProps): JSX.Element {
  const arrayOfStyles: Array<string> = styles.map((s) => {
    return main[s];
  });

  return (
    <button onClick={click} className={arrayOfStyles.join(" ")}>
      {buttonName}
    </button>
  );
}

function BurgerMenu(): JSX.Element {
  const setModalState = useSetModalState();

  function handleClick() {
    setModalState(true);
  }

  return (
    <a onClick={handleClick} role="button" className={main["navbar-burger"]}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  );
}

export { Buttons, BurgerMenu };
