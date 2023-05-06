import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTypes,
  fetchTypes,
  setSelectType,
} from "../reducers/productsSlice";

const TypeBar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTypes());
  }, []);

  const types = useSelector(getAllTypes);
  return (
    <section role="typeBar" className="typeBar">
      <h1 className="typeBar__type" onClick={() => dispatch(setSelectType(""))}>
        Все
      </h1>
      {types.map((type) => (
        <h1
          className="typeBar__type"
          key={type.id}
          onClick={() => dispatch(setSelectType(type.id))}
        >
          {type.name}
        </h1>
      ))}
    </section>
  );
};

export default TypeBar;
