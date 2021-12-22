import React, { useEffect } from "react";
import { useGetNearByPets } from "../../hooks/user";
import { Card } from "../../components/ui/card";
import main from "../../styles/bulma.css";

function MascotasPerdidas() {
  const pets = useGetNearByPets();

  useEffect(() => {
    pets;
  }, []);

  return (
    <>
      <h1 className={[main["title"], main["is-2"]].join(" ")}>
        Mascotas perdidas cerca tuyo
      </h1>
      <ul>
        {pets?.length < 1 ? (
          <div>no hay mascotas cerca tuyo</div>
        ) : (
          pets?.map((p) => {
            return (
              <Card
                editable={false}
                id={p.objectID}
                key={p.objectID}
                description={p.description}
                name={p.name}
                pictureURL={p.pictureURL}
              />
            );
          })
        )}
      </ul>
    </>
  );
}

export { MascotasPerdidas };
