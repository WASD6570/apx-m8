import {
  atom,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
} from "recoil";

const headerModalState = atom({
  key: "headerModalState",
  default: false,
});

const whichForm = atom({
  key: "whichForm",
  default: true,
});

function useMountAuthForm() {
  const [value, setValue] = useRecoilState(whichForm);
  return [value, setValue] as const;
}

function useSetModalState() {
  const setModalState = useSetRecoilState(headerModalState);

  return setModalState;
}

function useGetModalState() {
  const modalState = useRecoilValue(headerModalState);
  return modalState;
}

export { useSetModalState, useGetModalState, useMountAuthForm };
