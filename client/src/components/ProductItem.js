import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cartSlice";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { decrementQuantity, incrementQuantity } from "../reducers/cartSlice";

function ProductItem({ product, quantity }) {
  const dispatch = useDispatch();
  return (
    <div role="product__item" className="product">
      <div>
        <img
          src={process.env.REACT_APP_API_URL + product.img}
          className="product__image"
        ></img>
      </div>
      <div className="product__details">
        <h2 className="product__details__name">{product.name}</h2>
        <div className="product__details__add">
          <span>{product.price} р.</span>
          {!quantity ? (
            <button onClick={() => dispatch(addToCart(product))}>
              Добавить в корзину
            </button>
          ) : (
            <div className="product__details__quantity">
              <AiOutlinePlus
                role="increment"
                onClick={() => dispatch(incrementQuantity(product.id))}
                className="amountButton"
              />
              <span>{quantity}</span>
              <AiOutlineMinus
                role="decrement"
                onClick={() => dispatch(decrementQuantity(product.id))}
                className="amountButton"
              />
            </div>
          )}
        </div>
        <span className="product__details__compound">{product.compound}</span>
      </div>
    </div>
  );
}

export default ProductItem;
