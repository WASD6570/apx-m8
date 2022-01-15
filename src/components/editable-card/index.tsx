import React, { useState, useEffect } from "react";
import main from "../../styles/bulma.css";
import { Buttons } from "../ui/buttons";
import { TextField } from "../ui/text-field";
import { useGetUserData } from "../../hooks/user";
import { Map } from "../ui/map";
import { Dropzone } from "../dropzone";
import { useCreatePet, useUpdatePet } from "../../hooks/pet";

type editableCardProps = {
  editPet?: boolean;
  showModal?: any;
  initialData?: {
    id: any;
    description: string;
    name: string;
    pictureURL: any;
    picture: any;
    lat: any;
    lng: any;
  };
};

export function EditableCard(props: editableCardProps) {
  const userData = useGetUserData();
  const createPet = useCreatePet();
  const updatePet = useUpdatePet();
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    lat: userData.lat,
    lng: userData.lng,
    picture: "",
  });

  useEffect(() => {
    if (props.editPet) {
      setData(props.initialData);
    }
  }, []);

  function handleCreatePet(e) {
    try {
      e.preventDefault();
      const { name, description, lat, lng, picture } = data;
      if (name.length == 0)
        return window.alert("Completá el nombre de tu mascota");
      if (description.length == 0)
        return window.alert("Completá la descripcion de tu mascota");
      if (files.length == 0) return window.alert("Subí una foto de tu mascota");
      createPet({
        name,
        description,
        petPicture: picture,
        isLost: true,
        lng,
        lat,
      });
    } catch (error) {
      return window.alert(error.message);
    }
  }

  function handleUpdatePet(e) {
    e.preventDefault();
    const { name, description, lat, lng, picture } = data;
    if (name.length == 0)
      return window.alert("Completá el nombre de tu mascota");
    if (description.length == 0)
      return window.alert("Completá la descripcion de tu mascota");

    updatePet({
      petId: props.initialData.id,
      name,
      description,
      petPicture: picture,
      isLost: true,
      lng,
      lat,
    });
    props.showModal(false);
  }

  function handleUnpublishPet(e) {
    e.preventDefault();
    const { name, description, lat, lng, picture } = data;
    if (name.length == 0)
      return window.alert("Completá el nombre de tu mascota");
    if (description.length == 0)
      return window.alert("Completá la descripcion de tu mascota");
    updatePet({
      petId: props.initialData.id,
      name,
      description,
      petPicture: picture,
      isLost: false,
      lng,
      lat,
    });
    props.showModal(false);
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
              setData((p) => ({
                ...p,
                name: data,
              }));
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
              setData((p) => ({
                ...p,
                description: data,
              }));
            }}
            name="descripcion"
          />
        </label>
        <h2 className={[main["title"], main["is-5"], main["m-0"]].join(" ")}>
          ¿Donde se perdió?
        </h2>
        <Map petLocationCb={setData} />
        <label className={[main["label"], main.box].join(" ")}>
          <h2 className={[main["title"], main["is-5"], main["m-0"]].join(" ")}>
            Foto
          </h2>
          <p
            className={[main["subtitle"], main["is-6"], main["m-0"]].join(" ")}
          >
            {props.editPet
              ? "Si no querés cambiar la foto no hace falta que subas una nueva "
              : "Presioná acá para buscar una foto"}
          </p>
          <div className={[main["image"], main["is-2by1"]].join(" ")} id="dz-0">
            <Dropzone pictureCb={setData} files={files} setFiles={setFiles} />
          </div>
        </label>
        <div
          className={[
            main["is-flex"],
            main["is-flex-direction-column"],
            main["is-justify-content-center"],
            main["is-align-content-center"],
          ].join(" ")}
        >
          <Buttons
            buttonName="Enviar"
            styles={["button", "is-primary", "mb-2"]}
            click={props.editPet ? handleUpdatePet : handleCreatePet}
          />
          <Buttons
            buttonName="Eliminar foto"
            styles={["button", "is-danger", "mb-2"]}
            click={(e) => {
              e.preventDefault();
              setFiles([]);
              setData((p) => ({ ...p, picture: "" }));
            }}
          />
          {props.editPet ? (
            <Buttons
              buttonName="¡¡LA ENCONTRAMOS!!"
              styles={["button", "is-warning", "mb-2"]}
              click={handleUnpublishPet}
            />
          ) : null}
        </div>
      </form>
    </div>
  );
}
