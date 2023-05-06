import React, { Children } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Popup({ active, setActive, children }) {
  return (
    <div className={active ? "popup active" : "popup"}>
      <div role="popUp" className="popup__content">
        <AiFillCloseCircle
          className="popup__content__close"
          onClick={() => setActive(false)}
        />
        {children}
      </div>
    </div>
  );
}
