import { changeState, fetchOrders } from "../reducers/orderSlice";
import { useDispatch } from "react-redux";

export default function OrderItem({ order }) {
  const dispatch = useDispatch();
  const changeStatus = (e) => {
    dispatch(changeState({ status: e.target.value, id: order.id }));
    dispatch(fetchOrders());
  };

  return (
    <div className="order">
      <span>№{order.id}</span>
      <div className="order__contacts">
        <span>Имя:{order.name}</span>
        <span>Город:{order.city}</span>
        <span>Адресс:{order.address}</span>
        <span>Номер телфона:{order.phone}</span>
        {order.comment.length === 0 ? (
          <span>Коментарий отсутствует</span>
        ) : (
          <span>Коментарий к заказу:{order.comment}</span>
        )}
      </div>
      <div className="order__description">
        <span>Заказ</span>
        {order.products.map((product) => (
          <span key={product.id}>
            {product.name} {product.quantity}
          </span>
        ))}
        <span>
          Сумма заказа:
          {order.products.reduce((acc, product) => {
            return acc + product.price * product.quantity;
          }, 0)}{" "}
          р.
        </span>
      </div>
      <span className="textCenter">Способ оплаты:{order.payment}</span>
      <span className="textCenter">Состояние заказа:{order.finished}</span>
      {order.finished === "Выполняется" && (
        <div className="order__status">
          <button value="Завершен" onClick={changeStatus}>
            Завершить заказ
          </button>
          <button value="Отменен" onClick={changeStatus}>
            Отменить заказ
          </button>
        </div>
      )}
    </div>
  );
}
