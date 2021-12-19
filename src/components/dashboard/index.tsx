import React from "react";
import {
  useSetUserData,
  useGetUserData,
  useResetUserData,
} from "../../hooks/user";
import { useSetModalState } from "../../hooks/modal";
import { useNavigate } from "react-router-dom";
import { ModalCard } from "../ui/modal-card";

import main from "../../styles/bulma.css";

export function Dashboard(props) {
  const userData = useGetUserData();
  const setState = useSetUserData();
  const navigate = useNavigate();
  const resetUserData = useResetUserData();
  const modalState = useSetModalState();

  function handleCloseSession() {
    resetUserData();
    modalState(false);
    localStorage.removeItem("localData");
    navigate("/", { replace: true });
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
              className={main["m-03"]}
              onClick={() => {
                navigate("/mis-datos", { replace: true });
              }}
              id="mis-datos"
            >
              Mis Datos
            </div>
          </li>
          <li>
            <div
              className={main["m-4"]}
              onClick={() => {
                navigate("/mis-mascotas-reportadas", { replace: true });
              }}
              id="mis-mascotas-reportadas"
            >
              Mis Mascotas <br /> reportadas
            </div>
          </li>
          <li>
            <div
              className={main["m-03"]}
              onClick={() => {
                navigate("/reportar-mascota", { replace: true });
              }}
              id="reportar-mascota"
            >
              Reportar <br /> mascota
            </div>
          </li>
        </ul>
      </div>
    </ModalCard>
  );
}
