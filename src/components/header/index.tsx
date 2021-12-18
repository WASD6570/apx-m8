import React from "react";
import css from "./header.css";
import main from "../../styles/bulma.css";

export function Header(props) {
  return (
    <nav
      className={[main["navbar"], css["root"]].join(" ")}
      role="navigation"
      aria-label="main navigation"
    >
      <div className={main["navbar-brand"]}>{props.children}</div>
    </nav>
  );
}
