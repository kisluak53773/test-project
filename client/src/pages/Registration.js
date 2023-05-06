import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(register({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <section className="auth">
      <form method="#" onSubmit={submit}>
        <h1>Регистрация</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Введиет email..."
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Пароль.."
        />
        <input className="submit" type="submit" value="Зарегестрироваться" />
      </form>
    </section>
  );
}
