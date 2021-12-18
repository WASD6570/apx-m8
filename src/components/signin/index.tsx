import React, { useState } from "react";
import { useMountAuthForm } from "../../hooks/modal";
import { useSetUserData, useGetUserData, useGetToken } from "../../hooks/user";
import { ModalCard } from "../ui/modal-card";
import { useSetModalState } from "../../hooks/modal";
import { TextField } from "../ui/text-field";
import { Buttons } from "../ui/buttons";
import main from "../../styles/bulma.css";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [checkPass, setCheckPass] = useState("");
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
    mountForm(true);
  }

  function handleLogIn() {
    const test = validateEmail(email);
    if (!test) {
      setInputStyles(["is-danger", "input", "mb-2"]);
      return window.alert("Email invalido");
    }
    if (pass !== checkPass) {
      setInputStyles(["is-danger", "input", "mb2"]);
      return window.alert("Las contraseñas no coinciden");
    }
    modalState(false);
    setState({ ...userData, password: pass, email: email });
  }

  return (
    <ModalCard
      title="Crear una cuenta"
      footer={
        <p>
          Ya tienes una cuenta?{" "}
          <a onClick={handleMountSignIn}>Inicia sesion!</a>
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
      <TextField
        type="password"
        name="checkpassword"
        placeholder=" repite password"
        styles={inputStyles}
        callback={(data) => {
          setCheckPass(data);
        }}
      ></TextField>

      <Buttons
        click={handleLogIn}
        buttonName="crear cuenta"
        styles={["button", "is-link", "mb-2"]}
      ></Buttons>
    </ModalCard>
  );
}
