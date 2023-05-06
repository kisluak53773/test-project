import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../reducers/cartSlice";
import { useDispatch } from "react-redux";

export default function ({ product }) {
  const dispatch = useDispatch();

  const decrement = () => {
    dispatch(decrementQuantity(product.id));
  };
  const increment = () => {
    dispatch(incrementQuantity(product.id));
  };

  return (
    <div role="cart__item" className="cart__item">
      <img
        src={process.env.REACT_APP_API_URL + product.img}
        alt={product.name}
        className="cart__item__image"
      />
      <h1 className="cart__item__title">{product.name}</h1>
      <div className="cart__item__amount">
        <AiOutlinePlus role="increment" onClick={increment} className="amountButton" />
        <span>{product.quantity}</span>
        <AiOutlineMinus role="decrement" onClick={decrement} className="amountButton" />
      </div>
      <span>{product.price * product.quantity} р.</span>
      <AiOutlineDelete
          role="remove"
        className="cart__item__bin"
        onClick={() => dispatch(removeFromCart(product.id))}
      />
    </div>
  );
}
