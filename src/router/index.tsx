import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { Home } from "../pages/home/home";
import { MascotasPerdidas } from "../pages/mascotas-cerca";
import { ReportarMascota } from "../pages/reportar-mascota";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/mascotas-perdidas-cerca-tuyo" element={<Layout />}>
        <Route index element={<MascotasPerdidas />} />
      </Route>
      <Route path="/reportar-mascota" element={<Layout />}>
        <Route index element={<ReportarMascota />} />
      </Route>
    </Routes>
  );
}

export { AppRoutes };
