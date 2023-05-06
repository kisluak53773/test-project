import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userSlice";
import { getIsAuth } from "../reducers/userSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";

const NavBar = () => {
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
  };

  return (
    <header>
      <nav>
        <Link to="/" className="nav__logo">
          PizzaMania
        </Link>
        {isAuth ? (
          <>
            <Link className="nav__link" to="/cart">
              <AiOutlineShoppingCart className="cartIcon" size={25} />
            </Link>
            <span className="nav__link" onClick={logout}>
              Выйти
            </span>
            <Link className="nav__link" to="/admin">
              Админ панель
            </Link>
          </>
        ) : (
          <>
            <Link className="nav__link" to="/login">
              Войти
            </Link>
            <Link className="nav__link" to="/registration">
              Заргестрироваться
            </Link>
          </>
        )}
        <Outlet />
      </nav>
    </header>
  );
};

export default NavBar;
