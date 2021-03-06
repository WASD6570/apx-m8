import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { Home } from "../pages/home/home";
import { MascotasPerdidas } from "../pages/mascotas-cerca";
import { ReportarMascota } from "../pages/reportar-mascota";
import { MisMascotasReportadas } from "../pages/mis-mascotas-reportadas";
import { MisDatos } from "../pages/mis-datos";

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
      <Route path="/mis-mascotas-reportadas" element={<Layout />}>
        <Route index element={<MisMascotasReportadas />} />
      </Route>
      <Route path="/mis-datos" element={<Layout />}>
        <Route index element={<MisDatos />} />
      </Route>
    </Routes>
  );
}

export { AppRoutes };
