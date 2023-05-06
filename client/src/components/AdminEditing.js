import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { deleteType, deleteProduct } from "../http/productAPI";
import { getAllProducts, getAllTypes } from "../reducers/productsSlice";
import TypePopup from "../components/TypePopup";
import ProductPopup from "../components/ProductPopup";

export default function AdminEditing() {
  const products = useSelector(getAllProducts).map((product) => {
    return { value: product.id, label: product.name };
  });
  const types = useSelector(getAllTypes).map((type) => {
    return { value: type.id, label: type.name };
  });
  const [typePopup, setTypePopupActive] = useState(false);
  const [productPopup, setProductPopupActive] = useState(false);
  const [type, setType] = useState("");
  const [product, setProduct] = useState("");

  const handleDelete = (e) => {
    if (e.target.name === "type") {
      deleteType(type);
    } else {
      deleteProduct(product);
    }
  };

  const onChange = (data, e) => {
    if (e.name === "type") {
      setType(data.value);
    } else {
      setProduct(data.value);
    }
  };

  return (
    <div role="admin__editing" className="admin">
      <TypePopup
        typePopup={typePopup}
        setTypePopupActive={setTypePopupActive}
      />
      <ProductPopup
        productPopup={productPopup}
        setProductPopupActive={setProductPopupActive}
      />
      <h1 className="admin__title">Панель Администратора</h1>
      <div className="admin__content">
        <button
          className="admin__content__add"
          onClick={() => setTypePopupActive(true)}
        >
          Добавить новый тип продукта
        </button>
        <div className="admin__content__delete">
          <Select
            name="type"
            className="admin__content__delete__select"
            placeholder="Выберите тип"
            onChange={onChange}
            options={types}
          />
          <button name="type" onClick={handleDelete}>
            Удалить тип продукта
          </button>
        </div>
        <button
          className="admin__content__add"
          onClick={() => setProductPopupActive(true)}
        >
          Добавить продукт
        </button>
        <div className="admin__content__delete">
          <Select
            name="product"
            className="admin__content__delete__select"
            placeholder="Выберите продукт"
            onChange={onChange}
            options={products}
          />
          <button name="product" onClick={handleDelete}>
            Удалить продукт
          </button>
        </div>
      </div>
    </div>
  );
}
