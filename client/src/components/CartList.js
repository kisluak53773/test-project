import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCart, getError } from "../reducers/cartSlice";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

export default function CartList() {
  const cart = useSelector(getCart);
  const error = useSelector(getError);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/errorPage");
    }
  });

  return (
    <>
      {cart.length === 0 ? (
        <h1 role="cart__list">Корзина пуста</h1>
      ) : (
        <div role="cart__list" className="cart__list">
          {cart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
