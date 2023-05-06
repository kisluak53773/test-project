import React, { useState } from "react";
import Popup from "./Popup";
import { createProduct } from "../http/productAPI";
import Select from "react-select";
import { useSelector } from "react-redux";
import { getAllTypes } from "../reducers/productsSlice";

export default function ProductPopup({ productPopup, setProductPopupActive }) {
  const types = useSelector(getAllTypes).map((type) => {
    return { value: type.id, label: type.name };
  });
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [img, setImg] = useState("");
  const [compound, setCompound] = useState("");
  const [typeId, setTypeId] = useState("");

  const saveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("img", img);
    formData.append("compound", compound);
    formData.append("typeId", typeId);
    createProduct(formData);
    setProductPopupActive(false);
  };

  return (
    <Popup active={productPopup} setActive={setProductPopupActive}>
      <form method="#" onSubmit={saveProduct}>
        <h1 className="popup__content__title">Введите данные о продукте</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Название..."
          required
        ></input>
        <input
          value={price}
          onChange={(e) => setprice(e.target.value)}
          type="text"
          placeholder="Цена..."
          required
        ></input>
        <div className="popup__content__inputFile">
          <label
            htmlFor="imgInput"
            className="popup__content__inputFile__button"
          >
            Фото продукта
          </label>
          {img !== "" && <img src={URL.createObjectURL(img)}></img>}
          <input
            multiple={false}
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
            id="imgInput"
            className="popup__content__inputFile__input"
            type="file"
            required
          />
        </div>
        <input
          value={compound}
          onChange={(e) => setCompound(e.target.value)}
          type="text"
          placeholder="Состав..."
          required
        ></input>
        <div className="popup__content__select">
          <label htmlFor="select">Выберите тип пррдукта:</label>
          <Select
            id="select"
            placeholder="Тип..."
            onChange={(data) => setTypeId(data.value)}
            options={types}
            required
          />
        </div>
        <input type="submit" className="submit" placeholder="Сохранить" />
      </form>
    </Popup>
  );
}
