import React from "react";
import main from "../../../styles/bulma.css";

type textFieldProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  styles?: Array<string>;
  textArea?: boolean;
  callback?: (...any: any) => any;
};

export function TextField({
  label = "",
  type,
  placeholder = "",
  name,
  styles = ["input"],
  textArea = null,
  callback,
}: textFieldProps) {
  function handleChange(e) {
    const data = e.target.value;
    callback(data);
  }

  const arrayOfStyles: Array<string> = styles.map((s) => {
    return main[s];
  });

  return textArea != null ? (
    <>
      <label>
        <b>{label}</b>
      </label>
      <textarea
        onChange={handleChange}
        className={arrayOfStyles.join(" ")}
        placeholder={placeholder}
        name={name}
      />
    </>
  ) : (
    <>
      <label>
        <b>{label}</b>
      </label>
      <input
        onChange={handleChange}
        className={arrayOfStyles.join(" ")}
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </>
  );
}
