import React from "react";
import { useGetUserData, useResetUserData } from "../../hooks/user";
import { useNavigate } from "react-router-dom";
import { ModalCard } from "../ui/modal-card";

import main from "../../styles/bulma.css";

export function Dashboard(props) {
  const userData = useGetUserData();
  const navigate = useNavigate();
  const reset = useResetUserData();

  function handleCloseSession() {
    props.setShowModalCb(false);
    navigate("/", { replace: true });
    reset();
    localStorage.removeItem("localData");
    location.reload();
  }

  return (
    <ModalCard
      state={props.showModalState}
      toggleOffModal={props.setShowModalCb}
      title="Panel de control"
      footer={
        <>
          <p>{userData.email}</p>
          <p className={main["has-text-link"]} onClick={handleCloseSession}>
            cerrar sesion
          </p>
        </>
      }
    >
      <div className={main["menu"]}>
        <p className={main["menu-label"]}>General</p>
        <ul className={main["menu-list"]}>
          <li>
            <div
              className={main["m-3"]}
              onClick={() => {
                props.setShowModalCb(false);
                navigate("/mascotas-perdidas-cerca-tuyo", { replace: true });
              }}
              id="mis-datos"
            >
              Mascotas cerca tuyo
            </div>
          </li>
          <li>
            <div
              className={main["m-3"]}
              onClick={() => {
                props.setShowModalCb(false);
                navigate("/mis-mascotas-reportadas", { replace: true });
              }}
              id="mis-mascotas-reportadas"
            >
              Mis Mascotas <br /> reportadas
            </div>
          </li>
          <li>
            <div
              className={main["m-3"]}
              onClick={() => {
                props.setShowModalCb(false);
                navigate("/reportar-mascota", { replace: true });
              }}
              id="reportar-mascota"
            >
              Reportar <br /> mascota
            </div>
          </li>
          <li>
            <div
              className={main["m-3"]}
              onClick={() => {
                props.setShowModalCb(false);
                navigate("/mis-datos", { replace: true });
              }}
              id="mis-datos"
            >
              Mis Datos
            </div>
          </li>
        </ul>
      </div>
    </ModalCard>
  );
}
