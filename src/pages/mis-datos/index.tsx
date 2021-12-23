import React from "react";
import { useGetUserData } from "../../hooks/user";
import main from "../../styles/bulma.css";

export function MisDatos() {
  const userData = useGetUserData();
  return (
    <div className={main["menu"]}>
      <ul className={main["menu-list"]}>
        <li>
          <h2
            className={[
              main["subtitle"],
              main["is-3"],
              main["m-3"],
              main["has-text-info"],
            ].join(" ")}
          >
            Email:
          </h2>
          <p className={[main["subtitle"], main["is-4"]].join(" ")}>
            {" "}
            {userData.email}
          </p>
        </li>
        <li>
          <h2
            className={[
              main["subtitle"],
              main["is-3"],
              main["m-3"],
              main["has-text-info"],
            ].join(" ")}
          >
            Ubicación:
          </h2>
          <p className={[main["subtitle"], main["is-4"]].join(" ")}>
            {" "}
            Latitud: {userData.lat}
            <br />
            Longitud: {userData.lng}
          </p>
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
