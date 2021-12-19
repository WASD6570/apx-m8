import React, { useState, useEffect, Suspense } from "react";
import { BallTriangle } from "react-loading-icons";
import main from "../../../styles/bulma.css";
import css from "./index.css";
import { Buttons } from "../buttons";
import { ModalCard } from "../modal-card";
import { TextField } from "../text-field";
import { useSendReport } from "../../../hooks/report";

type cardProps = {
  pictureURL: string;
  description: string;
  name: string;
  id: any;
};

export function Card(props: cardProps) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const reportPet = useSendReport();

  function handleClick() {
    setShowModal(true);
  }

  function handleSend() {
    console.log("clickearon enviar");

    reportPet({ name, description, phone, id: props.id });
  }
  function handleCancel() {
    setShowModal(false);
  }

  return (
    <section className={css["mmr-page-body"]}>
      <div className={[css["card"], main["box"]].join(" ")}>
        <div className={main["card-image"]}>
          <figure className={[main["image"], main["is-4by3"]].join(" ")}>
            <img src={props.pictureURL} alt="Placeholder image" />
          </figure>
        </div>
        <div className={main["card-content"]}>
          <div className={main["media"]}>
            <div className={main["media-content"]}>
              <h4 className={[main["title"], main["is-4"]].join(" ")}>
                {props.name}
              </h4>
            </div>
          </div>
          <div className={main["content"]}>
            <p>{props.description}</p>
          </div>
          <div className={css["edit"]}>
            <Buttons
              buttonName="Reportar info"
              click={handleClick}
              styles={[
                "button",
                "is-small",
                "has-text-warning-dark",
                "is-ghost",
              ]}
            ></Buttons>
            <ModalCard
              footer={
                <div
                  className={[
                    main["is-flex"],
                    main["is-flex-direction-row"],
                  ].join(" ")}
                >
                  <Buttons
                    buttonName="enviar"
                    click={handleSend}
                    styles={["button", "is-link", "m-2"]}
                  ></Buttons>
                  <Buttons
                    buttonName="cancelar"
                    click={handleCancel}
                    styles={["button", "is-danger", "m-2"]}
                  ></Buttons>
                </div>
              }
              subtitle={"nueva info sobre " + props.name}
              state={showModal}
              toggleOffModal={setShowModal}
              title={"Reportar"}
            >
              <TextField
                label="Nombre"
                type="text"
                placeholder="Tu nombre"
                name="nombre"
                styles={["input", "is-info", "m-2"]}
                callback={(data) => {
                  setName(data);
                }}
              ></TextField>
              <TextField
                label="Telefono"
                type="text"
                placeholder="Tu celular"
                name="telefono"
                styles={["input", "is-info", "m-2"]}
                callback={(data) => {
                  setPhone(data);
                }}
              ></TextField>
              <TextField
                label="Descripcion"
                textArea={true}
                placeholder="Descripcion"
                name="description"
                styles={["textarea", "is-info", "m-2"]}
                callback={(data) => {
                  setDescription(data);
                }}
              ></TextField>
            </ModalCard>
          </div>
        </div>
      </div>
    </section>
  );
}
