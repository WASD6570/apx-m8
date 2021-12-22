import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import css from "./index.css";
import main from "../../styles/bulma.css";

type dzProps = {
  pictureCb: (uri: string) => void;
  children?: Array<any>;
  setFiles: (array: Array<any>) => void;
  files: Array<any>;
};

export function Dropzone(props: dzProps) {
  const [uri, setUri] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 10000000,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      let file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setUri(event.target.result as string);
      };
      reader.readAsDataURL(file);
      props.setFiles(
        acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  const thumbs = props.files.map((file) => (
    <div className={css.thubm} key={file.name}>
      <div className={css["thumb-inner"]}>
        <img src={file.preview} className={css["dz-img"]} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      props.files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [props.files]
  );

  useEffect(() => {
    props.pictureCb(uri);
  }, [uri]);

  return (
    <section className={["container"].join(" ")}>
      <div {...getRootProps({ className: "dropzone" })}>
        <aside
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={css["thumbs-container"]}
        >
          {thumbs}
        </aside>
        <input {...getInputProps()} />
      </div>
    </section>
  );
}
