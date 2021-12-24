import React from "react";
import main from "../../../styles/bulma.css";
import css from "./index.css";

export function Logo() {
  return (
    <a className={[main["navbar-item"], css["logo"]].join(" ")} href="/">
      <img
        src={
          "https://res.cloudinary.com/dacvdoq3z/image/upload/v1638409090/paw-solid_aijjqv.svg"
        }
        width="30"
        height="30"
      />
    </a>
  );
}
