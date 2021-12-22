import React, { useEffect } from "react";
import { Card } from "../../components/ui/card";
import { useGetUserPets } from "../../hooks/user";
import main from "../../styles/bulma.css";

export function MisMascotasReportadas() {
  //@ts-ignore
  const pets = useGetUserPets();

  console.log(pets);

  return (
    <>
      {pets?.length < 1 ? (
        <div>No reportaste ningun mascota todavia</div>
      ) : (
        pets?.map((p) => {
          return (
            <Card
              //updatePagePets={refresh}
              editable={true}
              id={p.id}
              key={p.id}
              description={p.description}
              name={p.name}
              pictureURL={p.pictureURL}
              lat={p.lat}
              lng={p.lng}
            />
          );
        })
      )}
    </>
  );
}
