import React, { useEffect } from "react";
import { Card } from "../../components/card";
import { useGetUserPets } from "../../hooks/user";
import css from "./index.css";
import main from "../../styles/bulma.css";

export function MisMascotasReportadas() {
  //@ts-ignore
  const pets = useGetUserPets();
  useEffect(() => {
    pets;
  }, []);
  return (
    <>
      <h1 className={[main["title"], main["is-2"]].join(" ")}>
        Mis mascotas reportadas
      </h1>
      <div key={1} className={[css["card-container"]].join(" ")}>
        <ul>
          {pets?.length < 1 ? (
            <div>No reportaste ningun mascota todavia</div>
          ) : (
            pets?.map((p) => {
              return (
                <div key={p.id} className={[css["card"]].join(" ")}>
                  <Card
                    //updatePagePets={refresh}
                    editable={true}
                    id={p.id}
                    description={p.description}
                    name={p.name}
                    pictureURL={p.pictureURL}
                    lat={p.lat}
                    lng={p.lng}
                  />
                </div>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}
