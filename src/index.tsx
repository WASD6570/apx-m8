import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./router";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { userDataState } from "./hooks/user";
import { Fallback } from "./components/ui/fallback";

function loadLocalData() {
  const dataTemplate = {
    token: null,
    lat: null,
    lng: null,
    email: null,
    password: null,
    userPets: null,
  };
  const localData = localStorage.getItem("localData");

  if (localData === "{}") {
    localStorage.setItem("localData", JSON.stringify(dataTemplate));
  }

  return localData != null ? JSON.parse(localData) : dataTemplate;
}

console.log(loadLocalData());

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot
      initializeState={({ set }) => {
        set(userDataState, loadLocalData());
      }}
    >
      <Suspense fallback={<Fallback loading={true} />}>
        <AppRoutes />
      </Suspense>
    </RecoilRoot>
  </BrowserRouter>,
  document.querySelector(".root")
);
