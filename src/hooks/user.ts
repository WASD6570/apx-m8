import { useState, useEffect } from "react";
import {
  atom,
  selector,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  selectorFamily,
  useResetRecoilState,
} from "recoil";
import { logIn, mascotasCercaTuyo } from "../lib/api";

const LOCAL_DATA = "localData";

type customRecoilState = {
  token: string;
  lat: number;
  lng: number;
  email: string;
  password: string;
  userPets: string;
};

const userDataState = atom({
  key: "userDataState",
  default: {
    token: null,
    lat: null,
    lng: null,
    email: null,
    password: null,
    userPets: null,
  },
});

// ejecuta la llamada para loguearse a la API SI SOLO SI
// existe mail y pass en el state Y si NO EXISTE token

const tokenState = selector({
  key: "tokenState",
  get: async ({ get }) => {
    const pass = get(userDataState)["password"];
    const email = get(userDataState)["email"];
    const token = get(userDataState)["token"];

    if (pass != null && email != null && typeof token !== "string") {
      const token = await logIn(email, pass);
      return token;
    } else return;
  },
});

// const asd = selector({
//   key: "rendom",
//   get: async ({ get }) => {
//     const pass = get(userDataState)["password"];
//     const email = get(userDataState)["email"];
//     const token = get(userDataState)["token"];

//     if (pass != null && email != null) {
//       const token = await logIn(email, pass);
//       return token;
//     } else return;
//   },
//   set: ({ set, get }, newValue) => {
//     const token = get(userDataState)["token"];
//     if (token === "no token") {
//       console.log("setter del");
//     }
//   },
// });

// devuelve las mascotas cerca de la ubicacion del User
// se ejecuta cada vez que el user entra a /mascotas-perdidas-cerca-tuyo
// para tener la data actualizada

const petsAround = selector({
  key: "petsAround",
  get: async ({ get }) => {
    const lat = get(userDataState)["lat"];
    const lng = get(userDataState)["lng"];
    if (lat && lng) {
      const pets = await mascotasCercaTuyo({ lat, lng });

      return pets;
    } else return;
  },
});

// selector para OBTENER el state o para SETEAR el state
// cuando se SETEA un nuevo state tambien guarda el ULTIMO STATE en localStorage
const stateSelector = selector({
  key: "stateSelector",
  get: ({ get }) => {
    const state = get(userDataState);
    return state;
  },
  set: ({ set, reset }, newValue: customRecoilState) => {
    localStorage.setItem(LOCAL_DATA, JSON.stringify(newValue));
    reset(userDataState);
    set(userDataState, newValue);
  },
});

// retorna las pets SI SOLO SI hay ubicacion disponible

function useGetNearByPets() {
  const pets = useRecoilValue(petsAround);
  return pets;
}

//loguea al usuario SI SOLO SI no hay token Y HAY email y password
//reaccional al cambio del state solamente
function useGetToken() {
  const [state, setState] = useRecoilState(stateSelector);
  const token = useRecoilValue(tokenState);
  useEffect(() => {
    if (
      typeof token === "string" &&
      state.email != null &&
      state.password != null
    )
      setState((p) => {
        return { ...p, token: token };
      });
  }, [state]);

  return;
}

function useSetUserData() {
  const setData = useSetRecoilState(stateSelector);
  return setData;
}

function useGetUserData() {
  const data = useRecoilValue(stateSelector);
  return data;
}

function useResetUserData() {
  const resetData = useResetRecoilState(stateSelector);
  return resetData;
}

export {
  useSetUserData,
  useGetUserData,
  useGetToken,
  useGetNearByPets,
  useResetUserData,
  userDataState,
};
