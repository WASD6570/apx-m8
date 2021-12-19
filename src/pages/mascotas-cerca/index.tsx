import React, { useEffect } from "react";
import { useGetNearByPets } from "../../hooks/user";
import { Card } from "../../components/ui/card";

function MascotasPerdidas() {
  const pets = useGetNearByPets();

  useEffect(() => {
    pets;
  }, []);

  return (
    <ul>
      {pets?.length < 1 ? (
        <div>no hay mascotas cerca tuyo</div>
      ) : (
        pets?.map((p) => {
          return (
            <Card
              key={p.objectID}
              description={p.description}
              name={p.name}
              pictureURL={p.pictureURL}
            />
          );
        })
      )}
    </ul>
  );
}

export { MascotasPerdidas };
