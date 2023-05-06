import { useDispatch } from "react-redux";
import { setPage } from "../reducers/orderSlice";

export default function Pages({ limit, pageNum, count }) {
  const dispatch = useDispatch();
  const pages = [];
  const pagesCount = Math.ceil(count / limit);

  for (let i = 0; i < pagesCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div className="pages">
      {pages.map((page) => {
        return (
          <span
            className={page === pageNum ? "page_active" : "page"}
            key={page}
            onClick={(e) => dispatch(setPage(page))}
          >
            {page}
          </span>
        );
      })}
    </div>
  );
}
