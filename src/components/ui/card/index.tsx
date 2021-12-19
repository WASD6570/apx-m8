import React, { useState, useEffect, Suspense } from "react";
import { BallTriangle } from "react-loading-icons";
import main from "../../../styles/bulma.css";
import css from "./index.css";
import { Buttons } from "../buttons";
import { ModalCard } from "../modal-card";

type cardProps = {
  pictureURL: string;
  description: string;
  name: string;
};

export function Card(props: cardProps) {
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
    setShowModal(true);
  }
  return (
    <section className={css["mmr-page-body"]}>
      <div className={[css["card"], main["box"]].join(" ")}>
        <div className={main["card-image"]}>
          <figure className={[main["image"], main["is-4by3"]].join(" ")}>
            <img src={props.pictureURL} alt="Placeholder image" />
          </figure>
        </div>
        <div className={main["card-content"]}>
          <div className={main["media"]}>
            <div className={main["media-content"]}>
              <h4 className={[main["title"], main["is-4"]].join(" ")}>
                {props.name}
              </h4>
            </div>
          </div>
          <div className={main["content"]}>
            <p>{props.description}</p>
          </div>
          <div className={css["edit"]}>
            <Buttons
              buttonName="Reportar info"
              click={handleClick}
              styles={[
                "button",
                "is-small",
                "has-text-warning-dark",
                "is-ghost",
              ]}
            ></Buttons>
            <ModalCard
              subtitle={"nueva info sobre " + props.name}
              state={showModal}
              toggleOffModal={setShowModal}
              title={"Reportar"}
            ></ModalCard>
          </div>
        </div>
      </div>
    </section>
  );
}
