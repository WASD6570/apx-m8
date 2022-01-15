import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./router";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { userDataState, loadLocalData } from "./hooks/user";
import { Fallback } from "./components/ui/fallback";
ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot
      initializeState={({ set }) => {
        set(userDataState, loadLocalData());
      }}
    >
      <Suspense fallback={<Fallback />}>
        <AppRoutes />
      </Suspense>
    </RecoilRoot>
  </BrowserRouter>,
  document.querySelector("#root")
);
