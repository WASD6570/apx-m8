import React, { useEffect, useState } from "react";
import { useGetNearByPets } from "../../hooks/user";
import { Card } from "../../components/card";
import main from "../../styles/bulma.css";
import css from "./index.css";

function MascotasPerdidas() {
  const [pets, setPets] = useState([]);
  const getPets = useGetNearByPets();

  useEffect(() => {
    (async () => setPets(await getPets()))();
  }, []);

  function handleUpdate() {
    location.reload();
  }

  return (
    <>
      <h1 className={[main["title"], main["is-2"]].join(" ")}>
        Mascotas perdidas cerca tuyo
      </h1>
      <button
        className={[main["button"], main["is-small"], main["is-info"]].join(
          " "
        )}
        onClick={handleUpdate}
      >
        Actualizar
      </button>
      <div className={[css["card-container"]].join(" ")}>
        <ul>
          {pets.length < 1 ? (
            <div>no hay mascotas cerca tuyo</div>
          ) : (
            pets.map((p) => {
              return (
                <div key={p.objectID} className={[css["card"]].join(" ")}>
                  <Card
                    editable={false}
                    id={p.objectID}
                    key={p.objectID}
                    description={p.description}
                    name={p.name}
                    pictureURL={p.pictureURL}
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

export { MascotasPerdidas };
