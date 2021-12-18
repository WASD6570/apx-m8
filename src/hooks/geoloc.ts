import { atom, useSetRecoilState, useRecoilValue } from "recoil";

const userLocationState = atom({
  key: "userLocation",
  default: { lat: null, lng: null },
});

function useSetGeoLoc() {
  const setLocationVal = useSetRecoilState(userLocationState);
  return setLocationVal;
}

function useGetGeoLoc() {
  const location = useRecoilValue(userLocationState);
  return location;
}

export { useSetGeoLoc, useGetGeoLoc };
