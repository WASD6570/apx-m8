import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { atom, selector, useRecoilState } from "recoil";
import { createPet, updatePet } from "../lib/api";
import { userDataState, userPets } from "../hooks/user";

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
    if (token != null && petData.name != null && petData.petPicture != null) {
      const res = await createPet(petData, token);
      return res;
    } else return false;
  },
  set: ({ set }, newValue: petReport) => {
    return set(petReportState, newValue);
  },
});

function useCreatePet() {
  const navigate = useNavigate();
  const [pet, setPet] = useRecoilState(petRequest);

  useEffect(() => {
    if (pet?.toString()[0] == "4") {
      return window.alert(
        "No pudimos reportar tu mascota, reiniciá la app o recarga la página"
      );
    }
    if (pet === 200) {
      setPet(false);
      navigate("/mis-mascotas-reportadas", { replace: true });
    }
  });

  return setPet;
}

const updatePetState = atom({
  key: "updatePetState",
  default: {
    name: null,
    description: null,
    petPicture: null,
    lat: null,
    lng: null,
    isLost: null,
    petId: null,
  },
});

const updateRequest = selector({
  key: "updateRequest",
  get: async ({ get }) => {
    const token = get(userDataState)["token"];
    const petData = get(updatePetState);
    if (token != null && petData.name != null && petData.petPicture != null) {
      const res = await updatePet(petData, token);
      return { status: res.status, pets: res.pets };
    } else return false;
  },
  set: ({ set }, newValue: any) => {
    return set(updatePetState, newValue);
  },
});

function useUpdatePet() {
  const navigate = useNavigate();
  const [pet, setPet] = useRecoilState(updateRequest);
  const [petsState, setPetState] = useRecoilState(userPets);

  useEffect(() => {
    if (pet?.status?.toString()[0] == "4") {
      return window.alert(
        "No pudimos reportar tu mascota, reiniciá la app o recarga la página"
      );
    }
    if (pet?.status === 200) {
      setPetState(pet.pets);
      navigate("/mis-mascotas-reportadas", { replace: true });
    }
  }, [pet]);

  return setPet;
}

// { name, description, petPicture, lat, lng, isLost, petId }

export { useCreatePet, useUpdatePet };
