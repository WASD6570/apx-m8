import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import main from "../../styles/bulma.css";
import { Buttons } from "../../components/ui/buttons";
import { useSetUserData, useGetUserData } from "../../hooks/user";

function Home() {
  const setData = useSetUserData();
  const userData = useGetUserData();

  const buttonProps = ["button", "is-large", "is-success"];

  function handleGiveLocation() {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        setData({
          ...userData,
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => {
        window.alert("no pudimos obtener tu ubicacion");
      }
    );
  }

  return userData.lat == null ? (
    <>
      <h1 className={[main["title"], main["is-2"]].join(" ")}>
        Bienvenido a la app para reportar mascotas
      </h1>
      <h3 className={[main["title"], main["is-4"]].join(" ")}>
        Para poder reportar tu mascota perdida o ayudar a encontrar otras
        mascotas perdidas necesitamos conocer tu ubicacion
      </h3>
      {userData.lat == null ? (
        <Buttons
          styles={buttonProps}
          buttonName="Dar mi ubicacion"
          click={handleGiveLocation}
        ></Buttons>
      ) : (
        <Buttons
          styles={buttonProps}
          buttonName="listo!"
          click={handleGiveLocation}
        ></Buttons>
      )}
    </>
  ) : (
    <Navigate to="/mascotas-perdidas-cerca-tuyo"></Navigate>
  );
}

export { Home };
