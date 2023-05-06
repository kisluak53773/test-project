import React, { useState, useCallback } from "react";
import Popup from "./Popup";
import { createType } from "../http/productAPI";

export default function TypePopup({ typePopup, setTypePopupActive }) {
  const [name, setName] = useState("");

  const saveType = (e) => {
    e.preventDefault();
    createType({ name });
    setTypePopupActive(false);
  };

  return (
    <Popup active={typePopup} setActive={setTypePopupActive}>
      <form method="#" onSubmit={saveType}>
        <h1 className="popup__content__title">Введите название типа</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Название типа..."
          required
        ></input>
        <input type="submit" placeholder="Сохранить" className="submit" />
      </form>
    </Popup>
  );
}
