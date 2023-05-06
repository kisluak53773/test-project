import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getOrders,
  fetchOrders,
  getLimit,
  getPage,
  getCount,
  getIsLoading,
  getError,
} from "../reducers/orderSlice";
import OrderItem from "./OrderItem";
import Pages from "./Pages";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
  const orders = useSelector(getOrders);
  const limit = useSelector(getLimit);
  const page = useSelector(getPage);
  const count = useSelector(getCount);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const filteredOrders = [...orders].filter((order) => {
    return order.address.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    if (error) {
      navigate("/errorPage");
    }
  });

  useEffect(() => {
    dispatch(fetchOrders());
  }, [page]);

  return (
    <div className="orders">
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search"
            placeholder="Поиск по адресу..."
          ></input>
          {filteredOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
          <Pages limit={limit} pageNum={page} count={count} />
        </>
      )}
    </div>
  );
}
