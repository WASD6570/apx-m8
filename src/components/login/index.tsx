import React, { useState } from "react";
import { useMountAuthForm } from "../../hooks/modal";
import { useSetUserData, useGetUserData, useGetToken } from "../../hooks/user";
import { useSetModalState } from "../../hooks/modal";
import { ModalCard } from "../ui/modal-card";
import { TextField } from "../ui/text-field";
import { Buttons } from "../ui/buttons";
import main from "../../styles/bulma.css";

export function LogInForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [inputStyles, setInputStyles] = useState(["input", "mb-2", "is-info"]);

  const [, mountForm] = useMountAuthForm();
  const modalState = useSetModalState();
  const userData = useGetUserData();
  const setState = useSetUserData();
  useGetToken();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function handleMountSignIn() {
    mountForm(false);
  }

  function handleLogIn() {
    const test = validateEmail(email);
    if (!test) {
      setInputStyles(["is-danger", "input", "mb-2"]);
      return window.alert("wrong email");
    }
    modalState(false);
    setState({ ...userData, password: pass, email: email });
  }

  return (
    <ModalCard
      title="Inicia sesion"
      footer={
        <p>
          No tienes una cuenta todavia?{" "}
          <a onClick={handleMountSignIn}>Crea una ahora!</a>
        </p>
      }
    >
      <TextField
        type="email"
        name="email"
        placeholder="email"
        styles={inputStyles}
        callback={(data) => {
          setEmail(data);
        }}
      ></TextField>
      <TextField
        type="password"
        name="password"
        placeholder="password"
        styles={inputStyles}
        callback={(data) => {
          setPass(data);
        }}
      ></TextField>

      <Buttons
        click={handleLogIn}
        buttonName="inicia sesion"
        styles={["button", "is-success", "mb-2"]}
      ></Buttons>
    </ModalCard>
  );
}
