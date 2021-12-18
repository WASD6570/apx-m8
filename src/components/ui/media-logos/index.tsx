import React from "react";
import main from "../../../styles/bulma.css";
import css from "./index.css";

type mediaLogo = {
  iconImgUrl: string;
  iconLink: string;
  text?: string | null;
};

export function MediaLogo({ iconImgUrl, iconLink, text = null }: mediaLogo) {
  return (
    <a
      className={[main["button"], main["is-rounded"], css.root].join(" ")}
      href={iconLink}
    >
      {text}
      <img src={iconImgUrl} width="30" height="30" />
    </a>
  );
}
