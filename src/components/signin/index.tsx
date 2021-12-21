import React, { useState } from "react";
import { useMountAuthForm } from "../../hooks/modal";
import { useSetUserData, useGetUserData, useSignin } from "../../hooks/user";
import { ModalCard } from "../ui/modal-card";
import { TextField } from "../ui/text-field";
import { Buttons } from "../ui/buttons";
import main from "../../styles/bulma.css";

export function SignInForm(props) {
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [checkPass, setCheckPass] = useState(null);
  const [inputStyles, setInputStyles] = useState(["input", "mb-2", "is-info"]);
  const [passStyles, setPassStyles] = useState(["input", "mb-2", "is-info"]);

  const [, mountForm] = useMountAuthForm();
  const { setSigninData, setStartAccion } = useSignin();

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
      setPassStyles(["is-danger", "input", "mb-2"]);
      return window.alert("Las contraseñas no coinciden");
    }
    setStartAccion(true);
    setSigninData({ password: pass, email: email });
    // props.setShowModalCb(false);
  }

  return (
    <ModalCard
      state={props.showModalState}
      toggleOffModal={props.setShowModalCb}
      title="Crear una cuenta"
      footer={
        <>
          <p>Ya tienes una cuenta? </p>
          <div className={main["has-text-link"]} onClick={handleMountSignIn}>
            Inicia sesion!
          </div>
        </>
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
        styles={passStyles}
        callback={(data) => {
          setPass(data);
        }}
      ></TextField>
      <TextField
        type="password"
        name="checkpassword"
        placeholder=" repite password"
        styles={passStyles}
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
