import React, { useState, useEffect, useRef } from "react";
//@ts-ignore
import mapboxgl from "mapbox-gl";
import main from "../../../styles/bulma.css";
import css from "./index.css";
import { Buttons } from "../buttons";
import { TextField } from "../text-field";
import { useGetUserData } from "../../../hooks/user";
import { initSearchForm } from "../../../lib/mapbox";

type mapProps = {
  petLocationCb: (any: any) => any;
  children?: Array<any>;
};

export function Map(props: mapProps) {
  const userData = useGetUserData();
  const [search, setSearch] = useState("");
  const [lng, setLng] = useState(userData.lng);
  const [lat, setLat] = useState(userData.lat);
  const [zoom, setZoom] = useState(9);
  const [resultData, setResultData] = useState({
    geometry: { coordinates: [userData.lng, userData.lat] },
  });
  const mapContainer = useRef(null);
  const map = useRef(null);
  mapboxgl.accessToken =
    "pk.eyJ1Ijoid2FzZDEyIiwiYSI6ImNrd2FvNmdrZjI1NjQycGxqZ29ldGEzaWYifQ.UDM7Ur0JGtFmJe3WPidyQQ";

  console.log("component", mapboxgl.accessToken);

  const marker = new mapboxgl.Marker({
    anchor: "center",
    draggable: false,
  });

  async function handleSearch(e) {
    e.preventDefault();
    const result = await initSearchForm({
      value: search,
      lat: userData.lat,
      lng: userData.lng,
    });
    if (result == undefined) return;
    setResultData(result);
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    const removeEls = document.querySelector(".mapboxgl-control-container");
    removeEls.remove();
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    const [longitude, latitude] = resultData.geometry.coordinates;

    marker.setLngLat([longitude, latitude]).addTo(map.current);
    map.current.setCenter([longitude, latitude]);
    map.current.setZoom(14);
    setLat(latitude);
    setLng(longitude);
    document.querySelectorAll("elipse").forEach((el) => {
      el.remove();
    });
  }, [resultData]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("click", (e) => {
      const coordinates = e.lngLat;
      marker.setLngLat(coordinates).addTo(map.current);
      setLat(coordinates.lat);
      setLng(coordinates.lng);
      document.querySelectorAll("elipse").forEach((el) => {
        el.remove();
      });
    });
  });

  useEffect(() => {
    props.petLocationCb({ lat, lng });
  }, [lat, lng]);

  return (
    <div className={main["box"]}>
      <div
        className={[main["box"], main["field"], main["has-addons"]].join(" ")}
      >
        <TextField
          type="text"
          placeholder="Buscá una referencia"
          styles={["input", "is-info"]}
          callback={(data) => {
            setSearch(data);
          }}
          name="mapbox-search"
        />
        <Buttons
          buttonName="buscar"
          styles={["button", "is-primary", "ml-2"]}
          click={handleSearch}
        />
      </div>
      <div ref={mapContainer} className={css["map-container"]}></div>
    </div>
  );
}
