import React from "react";
import css from "./index.css";
import main from "../../styles/bulma.css";

export function Footer(props) {
  return (
    <footer
      className={[main.footer, main["has-text-centered"], css.root].join(" ")}
    >
      {props.children}
    </footer>
  );
}
