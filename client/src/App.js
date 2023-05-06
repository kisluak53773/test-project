import { useEffect } from "react";
import AppRoute from "./components/AppRoute";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { auth, getIsLoading, getError } from "./reducers/userSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/errorPage");
    }
  });

  useEffect(() => {
    dispatch(auth);
  }, []);

  return (
    <>
      <NavBar />
      {isLoading ? <h1>Loading...</h1> : <AppRoute />}
    </>
  );
}

export default App;
