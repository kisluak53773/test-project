import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProducts, getCart } from "../reducers/cartSlice";
import { getUser } from "../reducers/userSlice";

export default function CartForm() {
  const cart = useSelector(getCart);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [payment, setPayment] = useState("Наличные");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const PHONE_PATTERN = "/^(?(d{3}))?[- ]?(d{3})[- ]?(d{4})$/";

  const submitOrder = (e) => {
    e.preventDefault();
    dispatch(
      saveProducts({
        id: user.id,
        cart,
        comment,
        payment,
        name,
        city,
        phone,
        address,
      })
    );
  };

  const onRadioChange = (e) => {
    setPayment(e.target.value);
  };

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <>
      {cart.length !== 0 && (
        <form method="#" role="cart__form" onSubmit={submitOrder} className="cart__form">
          <div className="cart__data">
            <label htmlFor="name">ФИО</label>
            <input
                role="name"
              type="text"
              value={name}
              onChange={onNameChange}
              id="name"
              required
            ></input>
            <label htmlFor="city">Город</label>
            <input
                role="city"
              type="text"
              value={city}
              onChange={onCityChange}
              id="city"
              required
            ></input>
            <label htmlFor="phone">Телефон</label>
            <input
                role="phone"
              type="text"
              value={phone}
              onChange={onPhoneChange}
              id="phone"
              required
              pattern={PHONE_PATTERN}
            ></input>
            <label htmlFor="address">Адресс</label>
            <input
                role="address"
              type="text"
              value={address}
              onChange={onAddressChange}
              id="address"
              required
            ></input>
          </div>
          <div className="payment">
            <div>
              <input
                type="radio"
                name="payment"
                checked={payment === "Наличные"}
                onChange={onRadioChange}
                id="cash"
                value="Наличные"
              />
              <label htmlFor="cash">Наличные</label>
            </div>
            <div>
              <input
                type="radio"
                name="payment"
                checked={payment === "Карта"}
                onChange={onRadioChange}
                id="card"
                value="Карта"
              />
              <label htmlFor="card">Картой курьеру</label>
            </div>
          </div>
          <div className="comment">
            <h1>Коментарий к заказу</h1>
            <textarea value={comment} role="comment" onChange={onCommentChange} />
          </div>
          <span className="finalPrice">
            Итоговая цена:
            {cart.reduce((acc, product) => {
              return acc + product.price * product.quantity;
            }, 0)}
            р.
          </span>
          <input type="submit" className="submit" value="Оформит заказ" />
        </form>
      )}
    </>
  );
}
