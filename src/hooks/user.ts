import { useState, useEffect } from "react";
import {
  atom,
  selector,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  useResetRecoilState,
} from "recoil";
import { logIn, mascotasCercaTuyo, getUserPets, createUser } from "../lib/api";

const LOCAL_DATA = "localData";

type customRecoilState = {
  token: string;
  lat: number;
  lng: number;
  email: string;
  password: string;
};

const userDataState = atom({
  key: "userDataState",
  default: {
    token: null,
    lat: null,
    lng: null,
    email: null,
    password: null,
  },
});

const userPetsState = atom({
  key: "userPetsState",
  default: {
    userPets: [],
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
//reaccional al cambio del state solamente, SOLO PARA LOGIN
function useGetToken() {
  const [state, setState] = useRecoilState(stateSelector);
  const token = useRecoilValue(tokenState);
  useEffect(() => {
    if (token === "no token") {
      return setState(state);
    }
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

function useSignin() {
  const setUserData = useSetUserData();
  const [startAccion, setStartAccion] = useState(false);
  const [data, setSigninData] = useState({ email: null, password: null });
  useEffect(() => {
    if (data.email != null && data.password != null && startAccion !== false) {
      createUser(data.email, data.password).then((res) => {
        if (res.status === 200) {
          setUserData((p) => ({
            ...p,
            email: data.email,
            password: data.password,
            token: res.token,
          }));
        } else window.alert("ya existe ese mail");
      });
    } else return setStartAccion(false);
  }, [startAccion]);
  return { setSigninData, setStartAccion };
}

function useGetUserPets() {
  const userData = useGetUserData();
  const [pets, setPets] = useRecoilState(userPetsState);
  useEffect(() => {
    if (userData.token != null) {
      getUserPets(userData.token).then((pets) => {
        setPets(pets);
      });
    }
  }, []);
  return pets;
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
  useGetUserPets,
  useSignin,
};
