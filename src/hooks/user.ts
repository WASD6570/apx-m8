import { useEffect } from "react";
import {
  atom,
  selector,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  useResetRecoilState,
} from "recoil";
import {
  logIn,
  mascotasCercaTuyo,
  getUserPets,
  createUser,
  API_BASE_URL,
} from "../lib/api";

type customRecoilState = {
  token: string;
  lat: number;
  lng: number;
  email: string;
};

const userDataState = atom({
  key: "userDataState",
  default: {
    token: null,
    lat: null,
    lng: null,
    email: null,
  },
});

const userPets = atom({
  key: "userPets",
  default: [],
});

const userPetsState = selector({
  key: "userPetsRequest",
  get: async ({ get }) => {
    const token = get(userDataState)["token"];
    const defaultPets = get(userPets);
    if (token != null) {
      const userPets = await getUserPets(token);
      return userPets;
    } else return defaultPets;
  },
  set: ({ set }, newValue: any) => {
    set(userPets, newValue);
  },
});

function useGetUserPets() {
  const pets = useRecoilValue(userPetsState);
  return pets;
}

function useListenForUserPets() {
  const pets = useRecoilValue(userPets);
  return pets;
}
// REFACTOR DEL LOGIN
//////////////////////////////////////////////////////////////////////////////////
const authAtom = atom({
  key: "authAtom",
  default: {
    email: null,
    password: null,
  },
});

// Inicia sesion SOLO SI hay data valida en el authATOM

const loginToken = selector({
  key: "loginToken",
  get: async ({ get }) => {
    const email = get(authAtom)["email"];
    const password = get(authAtom)["password"];
    if (email != null && password != null) {
      const resObject = await logIn(email, password);
      return resObject;
    } else return false;
  },
});

function useLogin() {
  const loginTokenState = useRecoilValue(loginToken);
  const [loginAtom, setLoginAtom] = useRecoilState(authAtom);
  const setUserData = useSetUserData();
  useEffect(() => {
    if (loginTokenState?.status == 200 && loginAtom.email != null) {
      setUserData((p) => ({
        ...p,
        token: loginTokenState.token,
        email: loginAtom.email,
      }));
      setLoginAtom({ email: null, password: null });
    }
    if (loginTokenState?.status == 400) {
      setLoginAtom({ email: null, password: null });
      return window.alert("No existe un usuario con ese mail");
    }
    //return setLoginAtom({ email: null, password: null });
  }, [loginAtom]);
  return setLoginAtom;
}
// Inicia sesion SOLO SI hay data valida en el authATOM

const signinToken = selector({
  key: "signinToken",
  get: async ({ get }) => {
    const email = get(authAtom)["email"];
    const password = get(authAtom)["password"];
    if (email != null && password != null) {
      const resObject = await createUser(email, password);
      return resObject;
    } else return false;
  },
});

function useSignin() {
  const signinTokenstate = useRecoilValue(signinToken);
  const [signAtom, setSignAtom] = useRecoilState(authAtom);
  const setUserData = useSetUserData();
  useEffect(() => {
    if (signinTokenstate?.status == 200 && signAtom.email != null) {
      setUserData((p) => ({
        ...p,
        token: signinTokenstate.token,
        email: signAtom.email,
      }));
      setSignAtom({ email: null, password: null });
    }
    if (signinTokenstate?.status == 400) {
      setSignAtom({ email: null, password: null });
      return window.alert("Ya existe un usuario con ese mail");
    }
  }, [signAtom]);
  return setSignAtom;
}
//////////////////////////////////////////////////////////////////////////////////

// selector para OBTENER el state o para SETEAR el state
// cuando se SETEA un nuevo state tambien guarda el ULTIMO STATE en localStorage
const stateSelector = selector({
  key: "stateSelector",
  get: ({ get }) => {
    const state = get(userDataState);
    return state;
  },
  set: ({ set }, newValue: customRecoilState) => {
    localStorage.setItem("localData", JSON.stringify(newValue));
    set(userDataState, newValue);
  },
});

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
// retorna las pets SI SOLO SI hay ubicacion disponible

function useGetNearByPets() {
  const pets = useRecoilValue(petsAround);
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
  const reset = useResetRecoilState(userDataState);
  return reset;
}

const mapboxTokenState = atom({
  key: "mapboxTokenState",
  default: null,
});

const mapboxTokenRequest = selector({
  key: "mapboxTokenRequest",
  get: async ({ get }) => {
    const tokenState = get(mapboxTokenState);
    if (tokenState == null) {
      const res = await fetch(`${API_BASE_URL}/api/mapbox-token`);
      const token = await res.json();
      return token.token;
    } else return tokenState;
  },
});

function useGetMapbox() {
  const token = useRecoilValue(mapboxTokenRequest);
  return token;
}

export {
  useSetUserData,
  useGetUserData,
  useGetNearByPets,
  userDataState,
  userPets,
  useGetUserPets,
  useSignin,
  useLogin,
  useResetUserData,
  useListenForUserPets,
  useGetMapbox,
};
