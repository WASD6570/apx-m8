import React from "react";
import { EditableCard } from "../../components/editable-card";
import main from "../../styles/bulma.css";

export function ReportarMascota() {
  return (
    <>
      <h2 className={[main["title"], main["is-3"]].join(" ")}>
        Reportar una mascota perdida
      </h2>
      <EditableCard />
    </>
  );
}
