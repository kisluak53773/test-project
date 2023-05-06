import { authHost, host } from "./index";

export const createOrder = async (
  id,
  products,
  comment,
  payment,
  name,
  city,
  phone,
  address
) => {
  const { data } = await authHost.post(`api/order/`, {
    id,
    products,
    comment,
    payment,
    name,
    city,
    phone,
    address,
  });
  return data;
};

export const getAllOrders = async (limit = 5, page = 1) => {
  const { data } = await authHost.get(`api/order?limit=${limit}&page=${page}`);
  return data;
};

export const patchOrder = async (status, id) => {
  const { data } = await authHost.patch(`api/order`, { status, id });
  return data;
};
