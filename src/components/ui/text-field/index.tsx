import React from "react";
import main from "../../../styles/bulma.css";

type textFieldProps = {
  type: string;
  placeholder?: string;
  name: string;
  styles?: Array<string>;
  callback?: (...any: any) => any;
};

export function TextField({
  type,
  placeholder = "",
  name,
  styles = ["input"],
  callback,
}: textFieldProps) {
  function handleChange(e) {
    const data = e.target.value;
    callback(data);
  }

  const arrayOfStyles: Array<string> = styles.map((s) => {
    return main[s];
  });

  return (
    <input
      onChange={handleChange}
      className={arrayOfStyles.join(" ")}
      type={type}
      placeholder={placeholder}
      name={name}
    />
  );
}
