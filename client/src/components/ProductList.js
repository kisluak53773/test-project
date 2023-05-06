import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {
  fetchProducts,
  getAllProducts,
  getIsLoading,
  getSelectedType,
  getError,
} from "../reducers/productsSlice";
import { getCart } from "../reducers/cartSlice";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const selectedType = useSelector(getSelectedType);
  const cart = useSelector(getCart);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const navigate = useNavigate();

  useEffect(() => {
    if (error.product || error.type) {
      navigate("/errorPage");
    }
  });

  const getQuantity = (id) => {
    const product = cart.find((product) => product.id === id);
    if (product === undefined) {
      return false;
    } else {
      return product.quantity;
    }
  };

  useEffect(() => {
    if (selectedType === undefined) {
      dispatch(fetchProducts());
    } else dispatch(fetchProducts(selectedType));
  }, [selectedType]);

  return (
    <div role="product__list" className="productList">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            quantity={getQuantity(product.id)}
          />
        ))
      )}
    </div>
  );
}

export default ProductList;
