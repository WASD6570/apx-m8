import React, { useState, useEffect, useRef } from "react";
import main from "../../styles/bulma.css";
import css from "./index.css";
import { Buttons } from "../ui/buttons";
import { ModalCard } from "../ui/modal-card";
import { TextField } from "../ui/text-field";
import { useGetUserData } from "../../hooks/user";
import { Map } from "../ui/map";
import { Dropzone } from "../dropzone";
import { useCreatePet } from "../../hooks/pet";

export function EditableCard() {
  const userData = useGetUserData();
  const setPet = useCreatePet();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [petLocation, setPetLocation] = useState({ lat: null, lng: null });
  const [picture, setPicture] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setPet({
      name,
      description,
      petPicture: picture,
      isLost: true,
      lng: petLocation.lng,
      lat: petLocation.lat,
    });
  }

  return (
    <div
      className={[
        main["upload-form"],
        main["container"],
        main["has-text-centered"],
        main["box"],
      ].join(" ")}
    >
      <form className={[main["form"]].join(" ")}>
        <label className={[main["label"]].join(" ")}>
          <TextField
            label="Nombre"
            type="text"
            placeholder="Nombre de la mascota"
            styles={["input", "is-info"]}
            callback={(data) => {
              setName(data);
            }}
            name="nombre"
          />
        </label>
        <label className={[main["label"]].join(" ")}>
          <TextField
            label="Descripcion"
            textArea={true}
            placeholder="Datos e informacion util para encontrar tu mascota..."
            styles={["textarea", "is-info"]}
            callback={(data) => {
              setDescription(data);
            }}
            name="descripcion"
          />
        </label>
        <h2 className={[main["title"], main["is-5"]].join(" ")}>
          ¿Donde se perdió?
        </h2>
        <p className={[main["subtitle"], main["is-6"], main["m-0"]].join(" ")}>
          Podes buscar como referencia un lugar conocido o hacer click en el
          mapa para establecer una ubicacion
        </p>
        <Map petLocationCb={setPetLocation} />
        <label className={[main["label"], main.box].join(" ")}>
          <h2 className={[main["title"], main["is-5"], main["m-0"]].join(" ")}>
            Foto
          </h2>
          <p
            className={[main["subtitle"], main["is-6"], main["m-0"]].join(" ")}
          >
            Arrastrá la foto aca o hace click para buscar una
          </p>
          <div className={[main["image"], main["is-2by1"]].join(" ")} id="dz-0">
            <Dropzone pictureCb={setPicture} />
          </div>
        </label>
        <div
          className={[
            main["field"],
            main["is-grouped"],
            main["is-flex"],
            main["is-justify-content-center"],
            main["is-align-content-center"],
          ].join(" ")}
        >
          <Buttons
            buttonName="Enviar"
            styles={["button", "is-primary", "ml-2"]}
            click={handleSearch}
          />
          <Buttons
            buttonName="Eliminar foto"
            styles={["button", "is-danger", "ml-2"]}
            click={() => {}}
          />
        </div>
      </form>
    </div>
  );
}
