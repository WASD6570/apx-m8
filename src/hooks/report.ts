import {
  atom,
  selector,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  selectorFamily,
  useResetRecoilState,
} from "recoil";
import { reportPet } from "../lib/api";
import { useGetUserData, userDataState } from "./user";
import { useState, useEffect } from "react";

const reportState = atom({
  key: "reportState",
  default: {
    phone: null,
    description: null,
    id: null,
    name: null,
  },
});

const reportRequest = selector({
  key: "reportRequest",
  get: async ({ get }) => {
    const report = get(reportState);
    const token = get(userDataState)["token"];
    const email = get(userDataState)["email"];
    if (
      report.phone != null &&
      report.description != null &&
      token != null &&
      email != null
    ) {
      const fullReport = {
        ...report,
        token,
        email,
      };
      const response = await reportPet(fullReport);
      return response;
    } else return false;
  },
  set: ({ set }, newValue: any) => {
    set(reportState, newValue);
  },
});

function useSendReport() {
  const [report, setReport] = useRecoilState(reportRequest);
  useEffect(() => {}, [report]);

  return setReport;
}

export { useSendReport };
