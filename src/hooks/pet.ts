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
import { useGetUserData, userDataState } from "../hooks/user";

type petReport = {
  name: string;
  description: string;
  petPicture: any;
  lat: any;
  lng: any;
  isLost: boolean;
};

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

const petRequest = selector({
  key: "petRequest",
  get: async ({ get }) => {
    const petData = get(petReportState);
    const token = get(userDataState)["token"];
    const pet = await createPet(petData, token);
    return pet;
  },
  set: ({ set }, newValue: petReport) => {
    return set(petReportState, newValue);
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
