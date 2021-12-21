import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import css from "./index.css";
import main from "../../styles/bulma.css";

type dzProps = {
  pictureCb: (any: any) => any;
  children?: Array<any>;
};

export function Dropzone(props: dzProps) {
  let initUri: ArrayBuffer | string;
  const [files, setFiles] = useState([]);
  const [uri, setUri] = useState(initUri);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 10000000,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      let file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setUri(event.target.result);
      };
      reader.readAsDataURL(file);
      setFiles(
        acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  const thumbs = files.map((file) => (
    <div className={css.thubm} key={file.name}>
      <div className={css["thumb-inner"]}>
        <img src={file.preview} className={css["dz-img"]} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
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
