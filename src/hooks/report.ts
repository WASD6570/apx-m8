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
import { useGetUserData } from "./user";
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

function useSendReport() {
  const [report, setReport] = useRecoilState(reportState);
  const userData = useGetUserData();
  useEffect(() => {
    if (
      report.phone != null &&
      report.description != null &&
      userData.token != null
    ) {
      const fullReport = {
        ...report,
        token: userData.token,
        email: userData.email,
      };
      reportPet(fullReport);
    }
  }, [report]);

  return setReport;
}

export { useSendReport };
