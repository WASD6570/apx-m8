import React, { useState } from "react";
import {
  useSetUserData,
  useGetUserData,
  useResetUserData,
} from "../../hooks/user";
import { useSetModalState } from "../../hooks/modal";
import { useNavigate } from "react-router-dom";
import { ModalCard } from "../ui/modal-card";
import { TextField } from "../ui/text-field";
import { Buttons } from "../ui/buttons";
import main from "../../styles/bulma.css";

export function Dashboard() {
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
      title="Panel de control"
      footer={
        <>
          <p>{userData.email}</p>
          <a onClick={handleCloseSession}>cerrar sesion</a>
        </>
      }
    >
      <div>cosas</div>
    </ModalCard>
  );
}
