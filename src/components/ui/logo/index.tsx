import React from "react";
import { useNavigate } from "react-router-dom";
import main from "../../../styles/bulma.css";

export function Logo() {
  const navigate = useNavigate();
  function handleNavigate(e) {
    e.preventDefault();
    navigate("/", { replace: true });
  }
  return (
    <a className={main["navbar-item"]} onClick={handleNavigate}>
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
