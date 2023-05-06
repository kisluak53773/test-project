import { memo } from "react";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import Store from "../pages/Store";
import { useSelector } from "react-redux";

const AppRouter = memo(() => {
  const isAuth = useSelector((state) => state.user.isAuth);
  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Store />} />
    </Routes>
  );
});

export default AppRouter;
