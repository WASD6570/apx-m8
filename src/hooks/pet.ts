import { useState, useEffect } from "react";
import {
  atom,
  selector,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  useResetRecoilState,
} from "recoil";
import { createPet } from "../lib/api";
import { useGetUserData } from "../hooks/user";

const petReportState = atom({
  key: "petReportState",
  default: {
    name: null,
    description: null,
    petPicture: null,
    lat: null,
    lng: null,
    isLost: true,
  },
});

function useCreatePet() {
  const [pet, setPet] = useRecoilState(petReportState);
  const userData = useGetUserData();

  useEffect(() => {
    if (pet.name != null && userData.token != null) {
      createPet(pet, userData.token);
    }
  }, [pet]);
  return setPet;
}

export { useCreatePet };
