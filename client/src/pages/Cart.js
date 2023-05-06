import CartList from "../components/CartList";
import CartForm from "../components/CartForm";

export default function Cart() {
  return (
    <section className="cart">
      <h1>Корзина</h1>
      <CartList />
      <CartForm />
    </section>
  );
}
