import React from "react";
import { useGetUserPets } from "../../hooks/user";

export function MisMascotasReportadas() {
  const pets = useGetUserPets();
  console.log(pets);

  return <></>;
}
