import React, { useState, useEffect } from "react";
import main from "../../../styles/bulma.css";
import { useSetModalState, useGetModalState } from "../../../hooks/modal";

type buttonsProps = {
  buttonName?: string;
  styles: Array<string>;
  click: () => void | null;
  children?: Array<any>;
  modal?: boolean;
};

function Buttons({
  buttonName = "",
  styles,
  click,
  children,
  modal = false,
}: buttonsProps): JSX.Element {
  const arrayOfStyles: Array<string> = styles.map((s) => {
    return main[s];
  });

  return (
    <button onClick={click} className={arrayOfStyles.join(" ")}>
      {modal ? children : buttonName}
    </button>
  );
}

function BurgerMenu(props): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
    setShowModal(true);
  }

  return (
    <>
      <a onClick={handleClick} role="button" className={main["navbar-burger"]}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      {React.cloneElement(props.children, {
        showModalState: showModal,
        setShowModalCb: setShowModal,
      })}
    </>
  );
}

export { Buttons, BurgerMenu };
