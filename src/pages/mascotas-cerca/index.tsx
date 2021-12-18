import React, { useEffect } from "react";
import { useGetNearByPets } from "../../hooks/user";

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
          return <li key={p.name}>{p.name}</li>;
        })
      )}
    </ul>
  );
}

export { MascotasPerdidas };
